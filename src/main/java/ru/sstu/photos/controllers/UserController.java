package ru.sstu.photos.controllers;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.sstu.photos.domain.User;
import ru.sstu.photos.repo.UserRepo;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("api/user")
public class UserController {

    private final UserRepo userRepo;

    @Autowired
    public UserController(UserRepo userRepo) {
        this.userRepo = userRepo;
    }


    @GetMapping
    public List<User> list() {
        return userRepo.findAll();
    }

    @GetMapping("{id}")
    public User getOne(@PathVariable("id") User message) {
        return message;
    }

    @PostMapping
    public User create(@RequestBody User message) {
        message.setCreationDate(LocalDateTime.now());
        return userRepo.save(message);
    }

    @PutMapping("{id}")
    public User update(
            @PathVariable("id") User messageFromDb,
            @RequestBody User message
    ) {
        BeanUtils.copyProperties(message, messageFromDb, "id");

        return userRepo.save(messageFromDb);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") User user) { userRepo.delete(user); }
}
