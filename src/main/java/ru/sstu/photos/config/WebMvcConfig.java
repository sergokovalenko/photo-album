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

    @Value("${upload.path}")
    private String uploadPath;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000", "http://localhost:8080", "http://localhost:3001")
                .allowedMethods("GET", "POST", "PUT", "DELETE");
//        registry.addMapping("/api/**")
//                .allowedOrigins("http://localhost:3000", "http://localhost:8080")
//                .allowedMethods("GET", "POST", "PUT", "DELETE");
    }

/*    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new AuthoriseInterceptor(bll));
    }*/

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/img/uploads/**")
                .addResourceLocations("file://" + uploadPath + "/");
//        registry.addResourceHandler("/")
//                .addResourceLocations("classpath:/static/index.html");
    }
}