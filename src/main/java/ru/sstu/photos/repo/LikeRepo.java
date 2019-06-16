package ru.sstu.photos.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.sstu.photos.domain.Like_;

public interface LikeRepo extends JpaRepository<Like_, Long> {
}
