package ru.sstu.photos.controllers;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.sstu.photos.domain.ACCESS;
import ru.sstu.photos.domain.Album;
import ru.sstu.photos.domain.Photo;
import ru.sstu.photos.repo.AlbumRepo;
import ru.sstu.photos.repo.PhotoRepo;

import java.util.List;

@RestController
@RequestMapping("api/album")
public class AlbumController {

    private final AlbumRepo albumRepo;
    private final PhotoRepo photoRepo;

    @Autowired
    public AlbumController(AlbumRepo albumRepo, PhotoRepo photoRepo) {
        this.albumRepo = albumRepo;
        this.photoRepo = photoRepo;
        albumRepo.save(new Album("test album", 1L, ACCESS.ALL, ""));
        albumRepo.save(new Album("test album me", 1L, ACCESS.ME, ""));
        albumRepo.save(new Album("test album friend", 1L, ACCESS.FRIENDS, ""));
    }

    @RequestMapping("/getPhotosByAlbumId/{id}")
    public List<Photo> getPhotosByAlbumId(@PathVariable("id") Album album) {
        return photoRepo.findAllByAlbumId(album.getId());
    }

    @GetMapping
    public List<Album> list() {
        return albumRepo.findAll();
    }

    @GetMapping("{id}")
    public Album getOne(@PathVariable("id") Album item) {
        return item;
    }

    @PostMapping
    public Album create(@RequestBody Album item) {
        item.setPhotos_count(0);
        return albumRepo.save(item);
    }

    @PutMapping("{id}")
    public Album update(
            @PathVariable("id") Album itemFromDb,
            @RequestBody Album item
    ) {
        BeanUtils.copyProperties(item, itemFromDb, "id");

        return albumRepo.save(itemFromDb);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Long item) {
        albumRepo.deleteById(item);
    }
}
