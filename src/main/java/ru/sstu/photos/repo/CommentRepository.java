package ru.sstu.photos.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.sstu.photos.domain.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
