package AngularServer.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by a689638 on 9/17/2015.
 * Copyright (C) 2015 HEB
 *
 * @author Ryan Anders
 *         This software is the confidential and proprietary information
 *         of HEB
 */
@Controller
public class ServerController {
    @RequestMapping({
            "/",
    })
    public String index() {
        return "index.html";
        //return "forward:/index.html";
    }



}
