package AngularServer.repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by a689638 on 2/2/2016.
 * Copyright (C) 2016 HEB
 *
 * @author Ryan Anders
 *         This software is the confidential and proprietary information
 *         of HEB
 */
public class ConstantRepository<E> {
    public List<E> items = new ArrayList<>();
    private String name;
    private File storageLocation;
    private ObjectMapper mapper = new ObjectMapper();

    public ConstantRepository() {
    }

    public ConstantRepository(String name, File storageLocation) {
        this.name = name;
        this.storageLocation = new File(storageLocation.getAbsolutePath() + '/' + this.name + ".json");
        readFromFile();
    }

    private void readFromFile() {
        try {
            ConstantRepository temp = mapper.readValue(storageLocation, new TypeReference<ConstantRepository<E>>() {});
            this.items = temp.items;
        } catch (IOException e) {
            printError(e.toString());
        }
    }

    private void printError(String error) {
        System.out.println("error in:" + this.name + "--" + error);
    }

    public List<E> getAll() {
        return this.items;
    }
}
