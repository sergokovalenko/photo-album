package ru.sstu.photos.domain;

import javax.persistence.*;

@Entity
@Table
public class Album {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
    private Integer photos_count;
    private Long userId;
    private String url;

    public Album(String name, Long userId, ACCESS access, String url) {
        this.name = name;
        this.userId = userId;
        this.access = access;
        this.url = url;
    }
    private Album() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getPhotos_count() {
        return photos_count;
    }

    public void setPhotos_count(Integer photos_count) {
        this.photos_count = photos_count;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public ACCESS getAccess() {
        return access;
    }

    public void setAccess(ACCESS access) {
        this.access = access;
    }

    private ACCESS access;

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
