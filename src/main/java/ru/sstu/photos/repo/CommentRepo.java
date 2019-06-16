package ru.sstu.photos.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.sstu.photos.domain.Comment;

import java.util.List;

public interface CommentRepo extends JpaRepository<Comment, Long> {
    List<Comment> findAllByAlbum(Long album);
}
