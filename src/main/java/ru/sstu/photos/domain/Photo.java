package ru.sstu.photos.domain;

import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table
@ToString(of = {"id", "user_id"})
@EqualsAndHashCode(of = {"id"})
public class Photo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Long user_id;
    private String text;
    private Integer likes;
    private Long albumId;
    private String url;

    private Photo() {}

    public Photo(Long user_id, Long albumId, String text, String url) {
        this.user_id = user_id;
        this.url = url;
        this.text = text;
        this.albumId = albumId;
        this.likes = 0;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Integer getLikes() {
        return likes;
    }

    public void setLikes(Integer likes) {
        this.likes = likes;
    }

    public Long getAlbumId() {
        return albumId;
    }

    public void setAlbumId(Long albumId) {
        this.albumId = albumId;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
