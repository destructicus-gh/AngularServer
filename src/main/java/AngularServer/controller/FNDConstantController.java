package AngularServer.controller;

import AngularServer.models.fnd.Item;
import AngularServer.models.fnd.Skill;
import AngularServer.repository.ConstantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * Created by a689638 on 2/2/2016.
 * Copyright (C) 2016 HEB
 *
 * @author Ryan Anders
 *         This software is the confidential and proprietary information
 *         of HEB
 */
@Controller
public class FNDConstantController {
    @Autowired
    ConstantRepository<Item.Special> itemSpecialRepository;

    @Autowired
    ConstantRepository<Skill> skillConstantRepository;

    @RequestMapping(value = "/specials", method = RequestMethod.GET)
    public @ResponseBody
    List<Item.Special> getSpecials() {
        return itemSpecialRepository.getAll();
    }
    @RequestMapping(value = "/skills", method = RequestMethod.GET)
    public @ResponseBody
    List<Skill> getSkills() {
        return skillConstantRepository.getAll();
    }

}
