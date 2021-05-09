package ru.sstu.photos.domain;

import javax.persistence.*;

@Entity
@Table
public class Friend {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Long userId;
    private Long userId2;

    public Friend(Long userId, Long userId2) {
        this.userId = userId;
        this.userId2 = userId2;
    }

    private Friend() {}

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

    public Long getUserId2() {
        return userId2;
    }

    public void setUserId2(Long userId2) {
        this.userId2 = userId2;
    }
}
