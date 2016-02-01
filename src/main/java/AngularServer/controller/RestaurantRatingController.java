package AngularServer.controller;


import AngularServer.models.Restaurant;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Scanner;
import java.util.regex.Pattern;

/**
 * Created by a689638 on 9/17/2015.
 * Copyright (C) 2015 HEB
 *
 * @author Ryan Anders
 *         This software is the confidential and proprietary information
 *         of HEB
 */
@Controller
public class RestaurantRatingController {
    private static  ArrayList<Restaurant> restaurants = new ArrayList<>();

    @RequestMapping(value = "/newRestaurant",  method = RequestMethod.POST)
    public
    @ResponseBody
    String newRestaurant(@RequestBody Restaurant rest) {
        System.out.println(rest);
        try {
            restaurants.add(rest);
        }catch (Exception e){
            return e.getMessage();
        }
        return (rest.getName().equals("Broken Insert"))?"Nope":"it worked";
    }

    @RequestMapping("/restaurant")
    public
    @ResponseBody
    Restaurant restaurant(
            @RequestParam(value = "name", required = false) String name) {
        for (Restaurant r : restaurants) {
            if (r.name.toLowerCase().equals(name.toLowerCase())) {
                return r;
            }
        }
        return new Restaurant(0, "nullfind=" + name, new double[4]);
    }


    @RequestMapping("/restaurants")
    public
    @ResponseBody
    ArrayList<Restaurant> restaurants() {
        System.out.println("rest");
        return restaurants;
    }

    static{
        try {
            Scanner scanner = new Scanner(new FileInputStream(
                    new File("C:\\Users\\a689638\\IdeaProjects\\AngularServer\\src\\main\\resources\\public\\Book1.csv")));
            scanner.useDelimiter(Pattern.compile("\\n|,"));
            restaurants.clear();
            while (scanner.hasNext()) {
                String[] all = new String[]{scanner.next(),scanner.next(),scanner.next(),scanner.next(),scanner.next(),scanner.next()};
                Restaurant r = new Restaurant(all[0], Integer.parseInt(all[1]),
                        new double[]{Double.parseDouble(all[2]),
                                Double.parseDouble(all[3]),
                                Double.parseDouble(all[4]),
                                Double.parseDouble(all[5])});

                restaurants.add(r);
            }

        } catch (FileNotFoundException | NumberFormatException e) {
            e.printStackTrace();
        }
    }
}
