package ru.sstu.photos.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import ru.sstu.photos.BL.BLL;
import ru.sstu.photos.domain.Response;

@Controller
public class ActivationController {

    @Autowired
    private BLL bll;

    @GetMapping("/activate/{code}")
    public Response activate(@PathVariable String code) {
        boolean isActivated = bll.activateUser(code);

        return isActivated ? new Response("SUCCESS") : new Response("INVALID CODE");
    }
}
