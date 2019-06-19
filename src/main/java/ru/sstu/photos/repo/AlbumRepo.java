package ru.sstu.photos.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.sstu.photos.domain.Album;

import java.util.List;

public interface AlbumRepo extends JpaRepository<Album, Long> {
    List<Album> findAllByUserId(Long userId);
    List<Album> findByNameContaining(String query);
}
