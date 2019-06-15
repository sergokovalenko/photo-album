package ru.sstu.photos.controllers;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.sstu.photos.domain.Photo;
import ru.sstu.photos.repo.PhotoRepo;

import java.util.List;


@RestController
@RequestMapping("api/photo")
public class PhotoController {

    private PhotoRepo photoRepo;

    @Autowired
    public PhotoController(PhotoRepo photoRepo) {
        this.photoRepo = photoRepo;
    }

    @GetMapping
    public List<Photo> list() {
        return photoRepo.findAll();
    }

    @GetMapping("{id}")
    public Photo getOne(@PathVariable("id") Photo item) {
        return item;
    }

    @PostMapping
    public Photo create(@RequestBody Photo item) {
        item.setLikes(0);
        return photoRepo.save(item);
    }

    @PutMapping("{id}")
    public Photo update(
            @PathVariable("id") Photo itemFromDb,
            @RequestBody Photo item
    ) {
        BeanUtils.copyProperties(item, itemFromDb, "id");

        return photoRepo.save(itemFromDb);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Long item) { photoRepo.deleteById(item); }
}
