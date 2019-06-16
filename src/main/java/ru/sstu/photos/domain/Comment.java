package ru.sstu.photos.domain;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Table

public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String text;
    private Long user;
    private Instant date;
    private Long album;

    private Comment() {
    }

    public Comment(String text, Long user, Long album) {
        this.text = text;
        this.user = user;
        this.album = album;
        this.date = Instant.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Long getUser() {
        return user;
    }

    public void setUser(Long user) {
        this.user = user;
    }

    public Instant getDate() {
        return date;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public Long getAlbum() {
        return album;
    }

    public void setAlbum(Long album) {
        this.album = album;
    }
}
