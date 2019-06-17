package ru.sstu.photos.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.sstu.photos.domain.User;

import java.util.List;
import java.util.Optional;

public interface UserRepo extends JpaRepository<User, Long> {
    List<User> findByFirstNameOrLastNameOrNickname(String query, String query2, String query3);
    Optional<User> findById(Long id);
    User findByNickname(String nickname);
    User findByNicknameAndPassword(String nick, String pass);
}
