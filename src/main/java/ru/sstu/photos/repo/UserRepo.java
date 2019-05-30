package ru.sstu.photos.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.sstu.photos.domain.User;

public interface UserRepo extends JpaRepository<User, Long> {
}
