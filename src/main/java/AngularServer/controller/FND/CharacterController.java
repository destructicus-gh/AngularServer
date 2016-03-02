package AngularServer.controller.FND;

import AngularServer.models.fnd.Character;
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
 * Created by a689638 on 2/11/2016.
 * Copyright (C) 2016 HEB
 *
 * @author Ryan Anders
 *         This software is the confidential and proprietary information
 *         of HEB
 */
@Controller
public class CharacterController {
    @Autowired
    private FileRepository<Character> characterFileRepository;
    
    @RequestMapping("/character")
    public @ResponseBody
    List<Character> characters( @RequestParam(value = "search", required = false) String search) {
        characterFileRepository.readFromFile();
        return characterFileRepository.getItems();
    }
    @RequestMapping(value = "/character", method = RequestMethod.POST)
    public @ResponseBody
    Character saveCharacter(@RequestBody Character character) {
        characterFileRepository.add(character);
        characterFileRepository.writeToFile();
        return character;
    }

    @RequestMapping(value = "/character/{id}", method = RequestMethod.DELETE)
    public @ResponseBody
    Integer delete(@PathVariable Integer id) {
        characterFileRepository.remove(id);
        characterFileRepository.writeToFile();
        return id;
    }
    @RequestMapping(value = "/character/new", method = RequestMethod.GET)
    public @ResponseBody
    Character newCharacter() {
        Character character = new Character();
        characterFileRepository.add(character);
        characterFileRepository.writeToFile();
        return character;
    }
}
