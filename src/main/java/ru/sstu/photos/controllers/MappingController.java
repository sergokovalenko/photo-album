package ru.sstu.photos.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import ru.sstu.photos.BL.BLL;

@Controller
public class MappingController {

    private final BLL bll;

    public MappingController(BLL bll) {
        this.bll = bll;
    }

    @GetMapping("/")
    public String root() {
        return "redirect:/signin";
    }

    @GetMapping("/signin")
    public String signin() {
        return "EnterPage";
    }

    @PostMapping("/enter")
    public String enter(@RequestParam String token) {
        return bll.checkToken(token) ? "redirect:/main" : "redirect:/signin ";
    }
    @GetMapping("/main")
    public String main() {
        return "main";
    }

    @GetMapping("/signup")
    public String signup() {
        return "registration";
    }

    @PostMapping("/logout")
    public String logout(@RequestParam String token) {
//        bll.setStatusOnline(bll.getUserIdByToken(token), 4);
        bll.removeToken(token);
        return "redirect:/signin";
    }
}
