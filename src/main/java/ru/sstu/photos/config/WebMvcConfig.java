package ru.sstu.photos.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;
import ru.sstu.photos.BL.BLL;

@Configuration
@EnableWebMvc
public class WebMvcConfig implements WebMvcConfigurer {

    private BLL bll;

    public WebMvcConfig(BLL bll) {
        this.bll = bll;
    }

//    @Value("${upload.path}")
//    private String uploadPath;
//
//    @Value("${image.profile.path}")
//    private String uploadProfilePath;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**");
    }

/*    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new AuthoriseInterceptor(bll));
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/img/uploads/**")
                .addResourceLocations("file://" + uploadPath + "/");
        registry.addResourceHandler("/img/profiles/**")
                .addResourceLocations("file://" + uploadProfilePath + "/");
    }*/
}