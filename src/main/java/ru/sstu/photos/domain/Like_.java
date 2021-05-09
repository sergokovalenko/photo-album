package ru.sstu.photos.domain;

import javax.persistence.*;

@Entity
@Table
public class Like_ {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Long userId;
    private Long albumId;

    public Like_(Long userId, Long albumId) {
        this.userId = userId;
        this.albumId = albumId;
    }

    private Like_() {}

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

    public Long getAlbumId() {
        return albumId;
    }

    public void setAlbumId(Long albumId) {
        this.albumId = albumId;
    }
}
