package ru.sstu.photos.controllers;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.sstu.photos.BL.BLL;
import ru.sstu.photos.domain.*;
import ru.sstu.photos.repo.AlbumRepo;
import ru.sstu.photos.repo.PhotoRepo;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/album")
public class AlbumController {

    private final AlbumRepo albumRepo;
    private final PhotoRepo photoRepo;
    private final BLL bll;

    @Autowired
    public AlbumController(AlbumRepo albumRepo, PhotoRepo photoRepo, BLL bll) {
        this.albumRepo = albumRepo;
        this.photoRepo = photoRepo;
        this.bll = bll;
        albumRepo.save(new Album("test album", 28L, ACCESS.ALL, "img/uploads/img1342273306.jpg"));
        albumRepo.save(new Album("simple album", 28L, ACCESS.ALL, "img/uploads/6.jpg"));
        albumRepo.save(new Album("My BEST album", 29L, ACCESS.ALL, "img/uploads/8.jpg"));
        albumRepo.save(new Album("test album me", 28L, ACCESS.ME, "img/uploads/6.jpeg"));
        albumRepo.save(new Album("test album friend", 30L, ACCESS.FRIENDS, "img/uploads/Auto___Maserati_____Red_Maserati_sports_082603_.jpg"));
    }

    @RequestMapping("/getPhotosByAlbumId/{id}")
    public List<Photo> getPhotosByAlbumId(@PathVariable("id") Album album) {
        return photoRepo.findAllByAlbumId(album.getId());
    }

    @RequestMapping("/likeAlbum/{id}/{userId}")
    public Like_ likeAlbum(
            @PathVariable("id") Album album,
            @PathVariable("userId") User user
    ) {
        return bll.likeAlbum(album, user);
    }


    @RequestMapping("/getAlbumsByUserId/{id}")
    public List<Album> getAlbumsByUserId(@PathVariable("id") User user) {
        return user != null ? albumRepo.findAllByUserId(user.getId()): new ArrayList<Album>();
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
