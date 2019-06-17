package ru.sstu.photos.domain;

import java.time.Instant;

public class TUser extends User {

    private String token;

    public TUser(String lastName, String firstName, String nickname, String email, String password, String url, Instant birthDate, String token) {
        super( lastName,  firstName,  nickname,  email,  password,  url,birthDate);
        this.token = token;
    }

    public String getToken() {
        return this.token;
    }
}
