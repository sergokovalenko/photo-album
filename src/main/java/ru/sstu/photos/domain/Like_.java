package ru.sstu.photos.domain;

import javax.persistence.*;

@Entity
@Table
public class Like_ {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Long userId;
    private Long photoId;

    public Like_(Long userId, Long photoId) {
        this.userId = userId;
        this.photoId = photoId;
    }

    private Like_() {}

    public Long getPhotoId() {
        return photoId;
    }

    public void setPhotoId(Long photoId) {
        this.photoId = photoId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
