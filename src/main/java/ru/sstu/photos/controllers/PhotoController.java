package ru.sstu.photos.controllers;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.sstu.photos.BL.BLL;
import ru.sstu.photos.domain.Like_;
import ru.sstu.photos.domain.Photo;
import ru.sstu.photos.domain.User;
import ru.sstu.photos.repo.PhotoRepo;

import java.util.List;


@RestController
@RequestMapping("api/photo")
public class PhotoController {

    private PhotoRepo photoRepo;
    private BLL bll;

    @Autowired
    public PhotoController(PhotoRepo photoRepo, BLL bll) {
        this.photoRepo = photoRepo;
        this.bll = bll;
        photoRepo.save(new Photo(1L, 1L, "Test photo 1", ""));
        photoRepo.save(new Photo(1L, 1L, "Test photo 2", ""));
        photoRepo.save(new Photo(1L, 1L, "Test photo 3", ""));
        photoRepo.save(new Photo(1L, 1L, "Test photo 4", ""));
    }

    @RequestMapping("/likePhoto/{id}/{userId}")
    public Like_ likePhoto(
            @PathVariable("id") Photo photo,
            @PathVariable("userId") User user
    ) {
        return bll.likePhoto(photo, user);
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
    public Photo create(
            @RequestBody Photo item,
            @RequestParam(value = "file", required = false) MultipartFile file
    ) {
        item.setLikes(0);
        return bll.setPhoto(item, file);
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
