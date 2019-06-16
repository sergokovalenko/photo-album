package ru.sstu.photos.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.sstu.photos.domain.User;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User, Long> {
//    List<User> findByFirstNameOrFirstNameOrNickname(String query);
    Optional<User> findById(Long id);
}
