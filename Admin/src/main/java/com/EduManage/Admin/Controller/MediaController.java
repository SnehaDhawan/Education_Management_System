package com.EduManage.Admin.Controller;

import com.EduManage.Admin.domain.entity.Media;

import com.EduManage.Admin.service.MediaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/media")
public class MediaController {

    @Autowired
    private MediaService mediaService;

    // Use @RequestPart to explicitly bind multipart files
    @PostMapping("/upload")
    public ResponseEntity<Map<String, Object>> uploadFiles(@RequestParam("files") MultipartFile[] files) {
        List<Media> savedFiles = mediaService.saveFiles(files);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Files uploaded successfully");
        response.put("count", savedFiles.size());
        response.put("files", savedFiles.stream()
                .map(Media::getFilename)
                .toList());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/list")
    public ResponseEntity<List<Media>> getAllMedia() {
        List<Media> mediaList = mediaService.getAllMedia();
        return ResponseEntity.ok(mediaList);
    }

}
