package AngularServer.config;

import AngularServer.models.fnd.Character;
import AngularServer.models.fnd.Item;
import AngularServer.models.fnd.Skill;
import AngularServer.repository.ConstantRepository;
import AngularServer.repository.FileRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.File;

/**
 * Created by a689638 on 2/2/2016.
 * Copyright (C) 2016 HEB
 *
 * @author Ryan Anders
 *         This software is the confidential and proprietary information
 *         of HEB
 */
@Configuration
public class ModelConfig {
    @Value("${repo.folder}")
    private String folderString;

    @Bean
    public FileRepository<Item> getItemRepo() {
        return new FileRepository<>("Item", new File(folderString), Item.class);
    }

    @Bean
    public FileRepository<Character> getCharRepo() {
        return new FileRepository<>("Character", new File(folderString), Character.class);
    }

    @Bean
    public ConstantRepository<Skill> getSkillRepo() {
        return new ConstantRepository<>("Skill", new File(folderString));
    }

    @Bean
    public ConstantRepository<Item.Special> getSpecialRepo() {
        return new ConstantRepository<>("Item.Special", new File(folderString));
    }

}
