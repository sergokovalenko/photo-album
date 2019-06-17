package ru.sstu.photos.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import ru.sstu.photos.BL.BLL;

@Controller
public class ActivationController {

    @Autowired
    private BLL bll;

    @GetMapping("/activate/{code}")
    public String activate(@PathVariable String code) {
        boolean isActivated = bll.activateUser(code);

        return isActivated ? "redirect:/" : "No such Code";
    }
}
