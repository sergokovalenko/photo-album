package ru.sstu.photos.BL;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import ru.sstu.photos.domain.*;
import ru.sstu.photos.repo.LikeRepo;
import ru.sstu.photos.repo.PhotoRepo;
import ru.sstu.photos.repo.UserRepo;

import java.io.File;
import java.io.IOException;
import java.time.Instant;
import java.util.HashMap;
import java.util.UUID;

@Service
public class BLL {

    @Value("${upload.path}")
    private String uploadPath;
    //
//    @Value("${image.profile.path}")
//    private String uploadProfilePath;
//
    @Value("${image.mapping}")
    private String imageMapping;

    private final PhotoRepo photoRepo;
    private final LikeRepo likeRepo;
    private final UserRepo userRepo;

    private HashMap<Object, Token> userToken = new HashMap<>(); //Key(Object) is ID of User

    public BLL(PhotoRepo photoRepo, LikeRepo likeRepo, UserRepo userRepo) {
        this.photoRepo = photoRepo;
        this.likeRepo = likeRepo;
        this.userRepo = userRepo;
    }

    public HashMap<Object, Token> getUserToken() {
        return userToken;
    }

    public void addTokenToUser(User user, Token token) {
        this.userToken.put(user.getId(), token);
    }

    public Boolean checkToken(String token) {
        System.out.println(token);
        if (token == null || token.isEmpty()) {
            return false;
        }

        if (userToken.size() == 0) {
            return false;
        }
        Token storedToken = getToken(token);
        if (storedToken != null) {
            if (storedToken.getExpires().compareTo(Instant.now()) >= 0) {
                storedToken.setExpires(Instant.now().plusSeconds(Token.LIFETIME));
                return true;
            } else {
                removeToken(storedToken);
                return false;
            }
        } else {
            return false;
        }
    }

    private Token getToken(String token) {
        for (Object key : userToken.keySet()) {
            if (token.equals(userToken.get(key).getStringToken())) {
                return userToken.get(key);
            }
        }
        return null;
    }

    public int getUserIdByToken(String token) {
        for (Object key : userToken.keySet()) {
            if (token.equals(userToken.get(key).getStringToken())) {
                return (int) key;
            }
        }
        return -1;
    }

    public Boolean removeToken(Token token) {
        if (userToken.containsValue(token)) {
            for (Object key : userToken.keySet()) {
                if (userToken.get(key) == token) {
                    userToken.remove(key);
                    return true;
                }
            }
        }
        return false;
    }

    public Boolean removeToken(String token) {
        for (Object key : userToken.keySet()) {
            if (token.equals(userToken.get(key).getStringToken())) {
                userToken.remove(key);
                return true;
            }
        }
        return false;
    }

    public Like_ likePhoto(Photo photo, User user) {
        Like_ like = new Like_(user.getId(), photo.getId());
        return likeRepo.save(like);
    }

    public Photo setPhoto(Photo photo, MultipartFile file) {
        if (file != null && !file.getOriginalFilename().isEmpty()) {
            String resultFilename;

            if (file.getSize() == 0) {
                return null; // as error
            }

            String uuidFile = UUID.randomUUID().toString();
            resultFilename = uuidFile + "." + file.getOriginalFilename();
            try {
                File uploadDir = new File("//" + uploadPath);
                if (!uploadDir.exists()) {
                    uploadDir.mkdir();
                }
                file.transferTo(new File(uploadPath + "\\" + resultFilename));
                photo.setUrl(imageMapping + resultFilename);
                photoRepo.save(photo);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return photoRepo.save(photo);
    }

    public Boolean loginAlreadyExists(String login) {
        if (StringUtils.isEmpty(login)) {
            return false;
        }
        User us = userRepo.findByNickname(login);
        return us != null;
    }

    public TUser authorization(String login, String password) {
        if (!loginAlreadyExists(login)) {
            return null;
        }
        String newPass = Encoder.hash256(password);
        User user = userRepo.findByNicknameAndPassword(login, newPass);
        if (user == null) {
            return null;
        }

        if (user.getVerified() == VERIFICATION_STATUS.YES) {
            Token tkn = new Token();
            TUser tuser = new TUser(user.getLastName(),
                    user.getFirstName(),
                    user.getNickname(),
                    user.getEmail(),
                    user.getPassword(),
                    user.getUrl(),
                    user.getBirthDate(),
                    tkn.getStringToken());

            addTokenToUser(tuser, tkn);
            return tuser;
        } else {
            return null;
        }
    }

        public boolean activateUser(String code) {
            User usr = userRepo.findByCode(code);
            if (usr == null) {
                return false;
            }
            usr.setCode(null);
            userRepo.save(usr);
            return true;
        }

//    public void removeUsersToken(TUser user) {
//        this.userToken.remove(user.getId());
//    }

//
//    private NewUserDTO getUserByACode(String code) {
//        return database.getUserByACode(code);
//    }
//
//    public String authorization(String login, String password) {
//        if (loginAlreadyExists(login) == "false") {
//            return new Gson().toJson("No Such User");
//        }
//
//        UserDTO user = database.authorization(login, Encoder.hash256(password));
//        if (user == null) {
//            return new Gson().toJson("Incorrect password");
//        }
//
//        if (user.getActivation_code() == null) {
//            Token tkn = new Token();
//            TUser tuser = new TUser(user, tkn.getStringToken());
//            addTokenToUser(tuser, tkn);
//            setStatusOnline(tuser.getId(), 1);
//            return new Gson().toJson(tuser);
//        } else {
//            return new Gson().toJson("User is not activated yet");
//        }
//    }
    }