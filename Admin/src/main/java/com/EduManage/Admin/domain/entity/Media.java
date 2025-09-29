package com.EduManage.Admin.domain.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "media")
@Data
public class Media {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String filename;

    @Column(nullable = false)
    private Long size;

    @Column(name = "upload_time", nullable = false)
    private LocalDateTime uploadTime;

    // ✅ Not stored in DB, only used for response
    @Transient
    private String url;
}
