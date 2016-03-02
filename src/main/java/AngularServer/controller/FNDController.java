package AngularServer.controller;

import AngularServer.models.fnd.Item;
import AngularServer.repository.FileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * Created by a689638 on 1/29/2016.
 * Copyright (C) 2016 HEB
 *
 * @author Ryan Anders
 *         This software is the confidential and proprietary information
 *         of HEB
 */
@Controller
public class FNDController {
    @Autowired
    private FileRepository<Item> itemFileRepository;




    @RequestMapping("/item")
    public @ResponseBody
    List<Item> items( @RequestParam(value = "search", required = false) String search) {
        itemFileRepository.readFromFile();
        return itemFileRepository.getItems();
    }



    @RequestMapping(value = "/item", method = RequestMethod.POST)
    public @ResponseBody
    Item saveItem(@RequestBody Item item) {
        itemFileRepository.add(item);
        itemFileRepository.writeToFile();
        return item;
    }
    @RequestMapping(value = "/item/{id}", method = RequestMethod.DELETE)
    public @ResponseBody
    Integer delete(@PathVariable Integer id) {
        itemFileRepository.remove(id);
        itemFileRepository.writeToFile();
        return id;
    }
    @RequestMapping(value = "/item/new", method = RequestMethod.GET)
    public @ResponseBody
    Item newItem() {
        Item item = new Item();
        itemFileRepository.add(item);
        itemFileRepository.writeToFile();
        return item;
    }

}
