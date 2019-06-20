package ru.sstu.photos.domain;

import com.fasterxml.jackson.annotation.JsonView;
import ru.sstu.photos.domain.Views.View;

import javax.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name="lastName")
    private String lastName;
    @Column(name="firstName")
    private String firstName;
    @Column(name="isAdmin")
    private Boolean isAdmin = false;
    @Column(name="code")
    private String code;

    private User() {}

    public User(String lastName, String firstName, String nickname, String email, String password, String url, Instant birthDate) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.nickname = nickname;
        this.photoCount = 0;
        this.url = url;
        this.birthDate = birthDate;
        this.email = email;
        this.verified = VERIFICATION_STATUS.NO;
        this.password = password;
        this.code = UUID.randomUUID().toString();
    }

    public User(String lastName, String firstName, String nickname, String email, String password, String url, Instant birthDate, Boolean isAdmin, VERIFICATION_STATUS ver) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.nickname = nickname;
        this.photoCount = 0;
        this.url = url;
        this.birthDate = birthDate;
        this.email = email;
        this.password = password;
        this.code = UUID.randomUUID().toString();
        this.isAdmin = isAdmin;
        this.verified = ver;
    }

    @Column(name="verified")
    private VERIFICATION_STATUS verified;
    @Column(name="nickname")
    private String nickname;
    @Column(name="photoCount")
    private int photoCount;
    @Column(name="url")
    private String url;
    @Column(name="email")
    private String email;

    @Column(name="password")
    @JsonView(View.REST.class)
    private String password;
    @Column(name="birthDate")
    private Instant birthDate;

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

    public Boolean getAdmin() {
        return isAdmin;
    }

    public void setAdmin(Boolean admin) {
        isAdmin = admin;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
