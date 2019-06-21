package ru.sstu.photos.controllers;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.sstu.photos.BL.BLL;
import ru.sstu.photos.domain.Photo;
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
        photoRepo.save(new Photo(28L, 1L,  "/downloadFile/2.png"));
        photoRepo.save(new Photo(28L, 2L,  "/downloadFile/3.jpg"));
        photoRepo.save(new Photo(28L, 3L,  "/downloadFile/8.jpg"));
        photoRepo.save(new Photo(28L, 11L,  "/downloadFile/9.jpg"));
        photoRepo.save(new Photo(28L, 1L,  "/downloadFile/7.jpg"));
        photoRepo.save(new Photo(29L, 1L,  "/downloadFile/6.jpeg"));
        photoRepo.save(new Photo(29L, 1L,  "/downloadFile/5.jpeg"));
        photoRepo.save(new Photo(29L, 1L,  "/downloadFile/3.png"));
        photoRepo.save(new Photo(30L, 1L,  "/downloadFile/3.jpg"));
        photoRepo.save(new Photo(30L, 4L,  "/downloadFile/2.png"));
        photoRepo.save(new Photo(31L, 5L,  "/downloadFile/1.png"));
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
