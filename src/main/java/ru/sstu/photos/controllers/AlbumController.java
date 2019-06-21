package ru.sstu.photos.controllers;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.sstu.photos.BL.BLL;
import ru.sstu.photos.domain.*;
import ru.sstu.photos.repo.AlbumRepo;
import ru.sstu.photos.repo.LikeRepo;
import ru.sstu.photos.repo.PhotoRepo;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/album")
public class AlbumController {

    private final AlbumRepo albumRepo;
    private final PhotoRepo photoRepo;
    private final BLL bll;
    private final LikeRepo likeRepo;

    @Autowired
    public AlbumController(AlbumRepo albumRepo, PhotoRepo photoRepo, BLL bll, LikeRepo likeRepo) {
        this.albumRepo = albumRepo;
        this.photoRepo = photoRepo;
        this.bll = bll;
        this.likeRepo = likeRepo;
        albumRepo.save(new Album("test album", 28L, ACCESS.ALL, "downloadFile/img1342273306.jpg"));
        albumRepo.save(new Album("simple album", 28L, ACCESS.ALL, "downloadFile/6.jpg"));
        albumRepo.save(new Album("My BEST album", 29L, ACCESS.ALL, "downloadFile/8.jpg"));
        albumRepo.save(new Album("test album me", 28L, ACCESS.ME, "downloadFile/6.jpeg"));
        albumRepo.save(new Album("test album friend", 30L, ACCESS.FRIENDS, "downloadFile/Auto___Maserati_____Red_Maserati_sports_082603_.jpg"));
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
        if (likeRepo.findByUserIdAndAlbumId(user.getId(), album.getId()) != null) {
            return null;
        }
        return bll.likeAlbum(album, user);
    }


    @RequestMapping("/getAlbumsByUserId/{id}")
    public List<Album> getAlbumsByUserId(@PathVariable("id") User user) {
        if (user == null) {
            return new ArrayList<>();
        }
        List<Album> albs = albumRepo.findAllByUserId(user.getId());
        List<Album> aalbs = new ArrayList<>();
        albs.forEach(a -> {
            List<Like_> lik = likeRepo.findAllByAlbumId(a.getId());
            List<Photo> phList = photoRepo.findAllByAlbumId(a.getId());
            a.setLikes(lik.size());
            a.setPhotosCount(phList.size());
            aalbs.add(a);
        });
        return aalbs;
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
        if (item == null) {
            return null;
        }
        List<Like_> lik = likeRepo.findAllByAlbumId(item.getId());
        item.setLikes(lik.size());
        return item;
    }

    @PostMapping
    public Album create(@RequestBody Album item) {
        item.setPhotosCount(0);
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
