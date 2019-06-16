package ru.sstu.photos.controllers;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.sstu.photos.domain.Album;
import ru.sstu.photos.domain.Comment;
import ru.sstu.photos.domain.User;
import ru.sstu.photos.repo.CommentRepo;

import java.util.List;

@RestController
@RequestMapping("api/comment")
public class CommentController {

    private final CommentRepo commentRepo;

    @Autowired
    public CommentController(CommentRepo item) {
        this.commentRepo = item;
        commentRepo.save(new Comment("Very interesting comment", 8L, 1L));
        commentRepo.save(new Comment("Another very interesting comment", 9L, 1L));
        commentRepo.save(new Comment("Very interesting comment", 8L, 2L));
        commentRepo.save(new Comment("Another very interesting comment", 9L, 3L));
    }

    @RequestMapping(value = "/getCommentsByAlbumId/{id}", method = RequestMethod.GET)
    public List<Comment> getCommentsByAlbumId(
            @PathVariable("id") Album album
    ) {
        return commentRepo.findAllByAlbum(album.getId());
    }


    @RequestMapping(value = "/createComment", method = RequestMethod.POST)
    public Comment createComment(
            @RequestBody Comment comment
    ) {
        return commentRepo.save(new Comment(comment.getText(), comment.getUser(), comment.getAlbum()));
    }

    @GetMapping
    public List<Comment> list() {
        return commentRepo.findAll();
    }

    @GetMapping("{id}")
    public Comment getOne(@PathVariable("id") Comment item) {
        return item;
    }

    @PostMapping
    public Comment create(@RequestBody Comment item) {
        return commentRepo.save(item);
    }

    @PutMapping("{id}")
    public Comment update(
            @PathVariable("id") Comment itemFromDb,
            @RequestBody Comment item
    ) {
        BeanUtils.copyProperties(item, itemFromDb, "id");

        return commentRepo.save(itemFromDb);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Comment item) { commentRepo.delete(item); }
}
