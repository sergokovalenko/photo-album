package ru.sstu.photos.controllers;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.sstu.photos.BL.BLL;
import ru.sstu.photos.BL.Encoder;
import ru.sstu.photos.domain.Friend;
import ru.sstu.photos.domain.User;
import ru.sstu.photos.repo.FriendRepo;
import ru.sstu.photos.repo.UserRepo;
import ru.sstu.photos.service.UserService;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/user")
public class UserController {

    private final UserRepo userRepo;
    private final FriendRepo friendRepo;
    private final BLL bll;
    private final UserService userService;

    @Autowired
    public UserController(UserRepo userRepo, FriendRepo friendRepo, BLL bll, UserService userService) {
        this.userRepo = userRepo;
        this.friendRepo = friendRepo;
        this.bll = bll;
        this.userService = userService;
        User user1 = new User(
                "Ivanov",
                "Ivan",
                "Vano",
                "vano@mail.ru",
                "12345678",
                "",
                Instant.now());
        User user2 = new User(
                "Vitin",
                "Viktor",
                "Vitya",
                "vitya@mail.ru",
                "12345678",
                "",
                Instant.now()
        );
        User user3 = new User(
                "vovin",
                "vova",
                "Vovan",
                "vova@mail.ru",
                "12345678",
                "",
                Instant.now()
        );
        User user4 = new User(
                "Admin",
                "Admin",
                "Admin",
                "Admin@mail.ru",
                "12345678",
                "",
                Instant.now(),
                true);
        userRepo.save(user1);
        userRepo.save(user2);
        userRepo.save(user3);
        userRepo.save(user4);

        friendRepo.save(
                new Friend(user1.getId(), user2.getId())
        );
    }

    @RequestMapping("/addFriendToUser/{id}/{friend}")
    public Friend addFriendToUser(
            @PathVariable("id") User user,
            @PathVariable("friend") User friend
    ) {
        Friend fr = new Friend(user.getId(), friend.getId()); // TODO: auto accept request now
        Friend fr2 = new Friend(friend.getId(), user.getId());
        friendRepo.save(fr2);
        return friendRepo.save(fr);
    }

    @RequestMapping("/getFriendsById/{id}")
    public List<User> addFriendToUser(
            @PathVariable("id") User user
    ) {
        List<Friend> frl = friendRepo.findAllByUserId(user.getId());
        List<User> url = new ArrayList<>();
        frl.forEach((Friend f) -> {
            Optional<User> us = userRepo.findById(f.getUserId2());
            if (us.isPresent()) {
                url.add(us.get());
            }
        });
        return url;
    }

    @RequestMapping("/getFriendsByNicknameLastFirst/{userId}/{query}")
    public List<User> getFriendsByNickname(
            @PathVariable("userId") User user,
            @PathVariable("query") String query
    ) {
        List<Friend> frs = friendRepo.findAllByUserId(user.getId());
        List<User> list = new ArrayList<>();
        frs.forEach((Friend f) -> {
            Optional<User> us = userRepo.findById(f.getUserId2());
            if (us.isPresent()) {
                list.add(us.get());
            };
        });
        List<User> filtered = list.stream()
                .filter(u -> u.getNickname().equals(query) || u.getLastName().equals(query) || u.getFirstName().equals(query)).collect(Collectors.toList());

        return filtered;
    }

    @RequestMapping("/getUsersByNicknameLastFirst/{query}")
    public List<User> getFriendsByNickname(
            @PathVariable("query") String query
    ) {
        return userRepo.findByFirstNameOrLastNameOrNickname(query, query, query);
    }

    @GetMapping
    public List<User> list() {
        return userRepo.findAll();
    }

    @GetMapping("{id}")
    public User getOne(@PathVariable("id") User user) {
        return user;
    }

    @PostMapping
    public User create(@RequestBody User user) {
        user.setPassword(Encoder.hash256(user.getPassword()));
        userService.sendActivationEmail(user);

        return userRepo.save(user);
    }

    @PutMapping("{id}")
    public User update(
            @PathVariable("id") User userFromDb,
            @RequestBody User user
    ) {
        BeanUtils.copyProperties(user, userFromDb, "id");

        return userRepo.save(userFromDb);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") User user) { userRepo.delete(user); }
}
