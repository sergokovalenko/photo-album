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
    public Photo getOne(@PathVariable("id") Photo photo) {
        return photo;
    }

    @PostMapping
    public Photo create(@RequestBody Photo photo) {
        photo.setLikes(0);
        return photoRepo.save(photo);
    }

    @PutMapping("{id}")
    public Photo update(
            @PathVariable("id") Photo photoFromDb,
            @RequestBody Photo photo
    ) {
        BeanUtils.copyProperties(photo, photoFromDb, "id");

        return photoRepo.save(photoFromDb);
    }

//    @DeleteMapping("{id}")
//    public void delete(@PathVariable("id") Photo photo) { photoRepo.delete(photo); }

    @DeleteMapping("/{id}")
    void delete(@PathVariable("id") Long photo) {
        photoRepo.deleteById(photo);
    }
}
