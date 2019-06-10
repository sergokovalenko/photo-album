package ru.sstu.photos.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.sstu.photos.domain.Photo;

public interface PhotoRepo extends JpaRepository<Photo, Long> {
}
