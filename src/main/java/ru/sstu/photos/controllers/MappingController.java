package ru.sstu.photos.controllers;

import org.springframework.web.bind.annotation.*;
import ru.sstu.photos.BL.BLL;
import ru.sstu.photos.domain.Response;
import ru.sstu.photos.domain.TUser;

@RestController
public class MappingController {

    private final BLL bll;

    public MappingController(BLL bll) {
        this.bll = bll;
    }

//    @GetMapping("/")
//    public String root() {
//        return "index";
//    }

    @GetMapping("/signin")
    public String signin() {
        return "EnterPage";
    }

    @PostMapping("/enter")
    public String enter(@RequestParam String token) {
        return bll.checkToken(token) ? "redirect:/main" : "redirect:/signin ";
    }

    @RequestMapping(value = "/loginAlreadyExists/{login}", method = RequestMethod.POST, produces = "application/json")
    public Response loginAlreadyExists(@PathVariable String login) {
        return bll.loginAlreadyExists(login) ? new Response("YES") : new Response("NO");
    }

    @RequestMapping(value = "/authorization/{login}/{password}", method = RequestMethod.POST, produces = "application/json")
    public TUser authorization(@PathVariable String login, @PathVariable String password) {
        return bll.authorization(login, password);
    }

}
