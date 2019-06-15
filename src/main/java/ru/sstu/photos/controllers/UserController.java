package ru.sstu.photos.controllers;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.sstu.photos.domain.User;
import ru.sstu.photos.repo.UserRepo;

import java.time.Instant;
import java.time.temporal.TemporalUnit;
import java.util.List;

@RestController
@RequestMapping("api/user")
public class UserController {

    private final UserRepo userRepo;

    @Autowired
    public UserController(UserRepo userRepo) {
        this.userRepo = userRepo;
        userRepo.save(new User(
                "Ivanov",
                "Ivan",
                "Vano",
                "vano@mail.ru",
                "12345678",
                "",
                Instant.now()
        ));
        userRepo.save(new User(
                "Vitin",
                "Viktor",
                "Vitya",
                "vitya@mail.ru",
                "12345678",
                "",
                Instant.now()
        ));
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
