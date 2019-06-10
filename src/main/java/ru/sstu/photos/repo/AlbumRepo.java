package ru.sstu.photos.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.sstu.photos.domain.Album;

public interface AlbumRepo extends JpaRepository<Album, Long> {

}
