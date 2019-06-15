package ru.sstu.photos.controllers;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.sstu.photos.domain.Comment;
import ru.sstu.photos.repo.CommentRepo;

import java.util.List;

@RestController
@RequestMapping("api/Comment")
public class CommentController {

    private final CommentRepo CommentRepo;

    @Autowired
    public CommentController(CommentRepo item) {
        this.CommentRepo = item;
    }

    @GetMapping
    public List<Comment> list() {
        return CommentRepo.findAll();
    }

    @GetMapping("{id}")
    public Comment getOne(@PathVariable("id") Comment item) {
        return item;
    }

    @PostMapping
    public Comment create(@RequestBody Comment item) {
        return CommentRepo.save(item);
    }

    @PutMapping("{id}")
    public Comment update(
            @PathVariable("id") Comment itemFromDb,
            @RequestBody Comment item
    ) {
        BeanUtils.copyProperties(item, itemFromDb, "id");

        return CommentRepo.save(itemFromDb);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Comment item) { CommentRepo.delete(item); }
}
