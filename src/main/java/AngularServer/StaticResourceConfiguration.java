package AngularServer;

import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * Created by a689638 on 9/17/2015.
 * Copyright (C) 2015 HEB
 *
 * @author Ryan Anders
 *         This software is the confidential and proprietary information
 *         of HEB
 */
//@Configuration
public class StaticResourceConfiguration extends WebMvcConfigurerAdapter {

    //@Value("${static.path}")
    //private String staticPath = "C:\\Users\\a689638\\IdeaProjects\\AngularBackend1\\";
    private String staticPath = "C:\\Users\\a689638\\IdeaProjects\\AngularServer\\";

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        if(staticPath != null) {
            System.out.println("Serving static content from " + staticPath);
            registry.addResourceHandler("/**").addResourceLocations("file:" + staticPath);
        }
    }
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("redirect:/index.html");
    }
}
