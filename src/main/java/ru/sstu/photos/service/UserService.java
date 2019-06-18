package ru.sstu.photos.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import ru.sstu.photos.domain.User;

import java.util.Date;

@Service
public class UserService{

    @Autowired
    private MyMailSender mail;

    @Value("${host.url}")
    private String hostUrl;

    public boolean sendActivationEmail(User user) {
        if (!StringUtils.isEmpty(user.getEmail())) {
            String message = String.format(
                    "Hello, %s! %s \n" +
                            "Welcome to Photos. Please, visit next link: " + hostUrl + "/activate/%s",
                    user.getFirstName(),
                    new Date(),
                    user.getCode()
            );
            mail.send(user.getEmail(), "Activation code", message);
        }
        return true;
    }
}
