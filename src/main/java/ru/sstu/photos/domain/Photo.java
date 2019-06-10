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
    private int id;

    private int user_id;
    private String text;
    private int likes;

    private Photo() {}

    public Photo(int id, int user_id, String text) {
        this.id = id;
        this.user_id = user_id;
        this.text = text;
        this.likes = 0;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public int getLikes() {
        return likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }
}
