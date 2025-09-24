package com.EduManage.Authentication.entity;
import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "admins")
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="admin_id", nullable=false)
    private String adminId;

    @Column(nullable=false, unique=true)
    private String username;

    @Column(nullable=false)
    private String password;

    @Column(name="mobile_no", nullable=false, unique=true)
    private Long mobileNo;

    @Column(name="email_id", nullable=false, unique=true)
    private String emailId;
}
