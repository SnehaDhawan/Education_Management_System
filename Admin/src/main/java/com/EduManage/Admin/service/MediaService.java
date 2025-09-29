package com.EduManage.Admin.service;

import com.EduManage.Admin.domain.entity.Media;
import com.EduManage.Admin.repository.MediaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class MediaService {

    // ✅ Configurable upload folder (from application.properties)
    @Value("${file.upload-dir:upload/}")
    private String uploadDir;

    @Autowired
    private MediaRepository mediaRepository;

    public List<Media> saveFiles(MultipartFile[] files) {
        List<Media> savedMedia = new ArrayList<>();

        try {
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            for (MultipartFile file : files) {
                // ✅ Generate unique filename
                String uniqueFilename = UUID.randomUUID() + "_" + file.getOriginalFilename();
                Path filePath = uploadPath.resolve(uniqueFilename);

                // ✅ Save file to disk
                try (InputStream inputStream = file.getInputStream()) {
                    Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
                }

                // ✅ Save metadata in DB
                Media media = new Media();
                media.setFilename(uniqueFilename);
                media.setSize(file.getSize());
                media.setUploadTime(LocalDateTime.now());

                Media saved = mediaRepository.save(media);

                // ✅ Add accessible URL (so frontend can load directly)
                saved.setUrl("/upload/" + uniqueFilename);

                savedMedia.add(saved);
            }

        } catch (IOException e) {
            throw new RuntimeException("Failed to save uploaded files", e);
        }

        return savedMedia;
    }

    // ✅ Fetch all media with accessible URL
    public List<Media> getAllMedia() {
        List<Media> mediaList = mediaRepository.findAll();
        for (Media media : mediaList) {
           // media.setUrl("/upload/" + media.getFilename());
            media.setUrl("http://localhost:8082/upload/" + media.getFilename());
        }
        return mediaList;
    }
}
