package ru.sstu.photos.domain;

import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table
@ToString(of = {"user_id", "raw"})
@EqualsAndHashCode(of = {"raw"})
public class VerificationCode {
    public VerificationCode(int user_id, String raw) {
        this.user_id = user_id;
        this.raw = raw;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    private int user_id;
    private String raw;

    public String getRaw() {
        return raw;
    }

    public void setRaw(String raw) {
        this.raw = raw;
    }

    public int getId() {
        return user_id;
    }

    public void setId(int id) {
        this.user_id = id;
    }
}
