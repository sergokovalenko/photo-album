package ru.sstu.photos.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.*;
import java.time.Instant;
import java.time.LocalDateTime;

@Entity
@Table
@ToString(of = {"id", "nickname"})
@EqualsAndHashCode(of = {"id"})
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String lastName;
    private String firstName;

    private User() {}

    public User(String lastName, String firstName, String nickname, String email, String password, String url, Instant birthDate) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.nickname = nickname;
        this.photoCount = 0;
        this.url = url;
        this.birthDate = birthDate;
        this.email = email;
        this.verified = VERIFICATION_STATUS.NO;
        this.password = password;
    }

    private VERIFICATION_STATUS verified;
    private String nickname;
    private int photoCount;
    private String url;
    private String email;
    private String password;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Column(updatable = false)
    private Instant birthDate;

    public String getFirstName() { return firstName; }

    public void setFirstName(String firstName) { this.firstName = firstName;
    }

    public String getLastName() { return lastName;
    }

    public void setLastName(String lastName) { this.lastName = lastName;
    }

    public String getNickname() { return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public int getPhotoCount() {
        return photoCount;
    }

    public void setPhotoCount(int photoCount) {
        this.photoCount = photoCount;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Instant getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Instant birthDate) {
        this.birthDate = birthDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getCreationDate() {
        return birthDate;
    }

    public void setCreationDate(Instant birthDate) {
        this.birthDate = birthDate;
    }

    public VERIFICATION_STATUS getVerified() {
        return verified;
    }

    public void setVerified(VERIFICATION_STATUS verified) {
        this.verified = verified;
    }
}
