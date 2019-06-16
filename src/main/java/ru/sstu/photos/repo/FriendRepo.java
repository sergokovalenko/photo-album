package ru.sstu.photos.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.sstu.photos.domain.Friend;

import java.util.List;

public interface FriendRepo extends JpaRepository<Friend, Long> {
    List<Friend> findAllByUserId(Long user);
}
