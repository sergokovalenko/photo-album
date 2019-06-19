package ru.sstu.photos.controllers;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.sstu.photos.domain.ACCESS;
import ru.sstu.photos.domain.Album;
import ru.sstu.photos.domain.Photo;
import ru.sstu.photos.domain.User;
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
        albumRepo.save(new Album("test album", 12L, ACCESS.ALL, "img/uploads/img1342273306.jpg"));
        albumRepo.save(new Album("test album me", 12L, ACCESS.ME, "img/uploads/6.jpg"));
        albumRepo.save(new Album("test album friend", 12L, ACCESS.FRIENDS, "img/uploads/Auto___Maserati_____Red_Maserati_sports_082603_.jpg"));
    }

    @RequestMapping("/getPhotosByAlbumId/{id}")
    public List<Photo> getPhotosByAlbumId(@PathVariable("id") Album album) {
        return photoRepo.findAllByAlbumId(album.getId());
    }

    @RequestMapping("/getAlbumsByUserId/{id}")
    public List<Album> getAlbumsByUserId(@PathVariable("id") User user) {
        return albumRepo.findAllByUserId(user.getId());
    }

    @RequestMapping(value = "/getAlbumByQuery/{query}", method = RequestMethod.GET)
    public List<Album> getFriendsByNickname(
            @PathVariable("query") String query
    ) {
        return albumRepo.findByNameContaining(query);
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
