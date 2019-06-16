package ru.sstu.photos.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.sstu.photos.domain.Photo;

import java.util.List;

public interface PhotoRepo extends JpaRepository<Photo, Long> {

    void deleteById(Long id);
    List<Photo> findAllByAlbumId(Long albumId);
}
