package ru.sstu.photos.domain;

import javax.persistence.*;

@Entity
@Table
public class VerificationCode {

    public VerificationCode(Long user_id, String raw) {
        this.user_id = user_id;
        this.raw = raw;
    }

    private VerificationCode() {}

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    private Long user_id;
    private String raw;

    public String getRaw() {
        return raw;
    }

    public void setRaw(String raw) {
        this.raw = raw;
    }

    public Long getId() {
        return user_id;
    }

    public void setId(Long id) {
        this.user_id = id;
    }
}
