package ru.sstu.photos.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.sstu.photos.domain.Like_;

import java.util.List;

public interface LikeRepo extends JpaRepository<Like_, Long> {
    List<Like_> findAllByAlbumId(Long id);
    Like_ findByUserIdAndAlbumId(Long user, Long album);
}
