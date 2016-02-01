package AngularServer.models.fnd;

import AngularServer.models.Idenfitiable;

import java.io.Serializable;
import java.util.List;
import java.util.Set;

/**
 * Created by a689638 on 1/29/2016.
 * Copyright (C) 2016 HEB
 *
 * @author Ryan Anders
 *         This software is the confidential and proprietary information
 *         of HEB
 */

public class Character implements Idenfitiable, Serializable {


    public enum CharacterType{
        Player, Minion, Rival, Nemesis
    }
    Integer id;
    String name;
    String species;
    String Career;
    CharacterType type;
    //
    Integer soak;
    Integer wound_t;
    Integer wound_c;
    Integer strain_t;
    Integer strain_c;
    Integer defense_r;
    Integer defense_m;
    Characteristics characteristics;
    Set<Skill> skills;
    ///////




    List<Integer> items;

    @Override
    public void setId(Integer id) {
        this.id = id;
    }

    @Override
    public Integer getId() {
        return this.id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSpecies() {
        return species;
    }

    public void setSpecies(String species) {
        this.species = species;
    }

    public String getCareer() {
        return Career;
    }

    public void setCareer(String career) {
        Career = career;
    }

    public CharacterType getType() {
        return type;
    }

    public void setType(CharacterType type) {
        this.type = type;
    }

    public Integer getSoak() {
        return soak;
    }

    public void setSoak(Integer soak) {
        this.soak = soak;
    }

    public Integer getWound_t() {
        return wound_t;
    }

    public void setWound_t(Integer wound_t) {
        this.wound_t = wound_t;
    }

    public Integer getWound_c() {
        return wound_c;
    }

    public void setWound_c(Integer wound_c) {
        this.wound_c = wound_c;
    }

    public Integer getStrain_t() {
        return strain_t;
    }

    public void setStrain_t(Integer strain_t) {
        this.strain_t = strain_t;
    }

    public Integer getStrain_c() {
        return strain_c;
    }

    public void setStrain_c(Integer strain_c) {
        this.strain_c = strain_c;
    }

    public Integer getDefense_r() {
        return defense_r;
    }

    public void setDefense_r(Integer defense_r) {
        this.defense_r = defense_r;
    }

    public Integer getDefense_m() {
        return defense_m;
    }

    public void setDefense_m(Integer defense_m) {
        this.defense_m = defense_m;
    }

    public Characteristics getCharacteristics() {
        return characteristics;
    }

    public void setCharacteristics(Characteristics characteristics) {
        this.characteristics = characteristics;
    }

    public Set<Skill> getSkills() {
        return skills;
    }

    public void setSkills(Set<Skill> skills) {
        this.skills = skills;
    }

    public List<Integer> getItems() {
        return items;
    }

    public void setItems(List<Integer> items) {
        this.items = items;
    }
}
