package ru.sstu.photos.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import ru.sstu.photos.domain.User;

@Service
public class UserService{

    @Autowired
    private  MailSender mail;

    @Value("${host.url}")
    private String hostUrl;

    public boolean sendActivationEmail(User user) {
        if (!StringUtils.isEmpty(user.getEmail())) {
            String message = String.format(
                    "Hello, %s! \n" +
                            "Welcome to Photos. Please, visit next link: " + hostUrl + "/activate/%s",
                    user.getFirstName(),
                    user.getCode()
            );
            mail.send(user.getEmail(), "Activation code", message);
        }
        return true;
    }
}
