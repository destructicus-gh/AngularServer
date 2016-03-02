package AngularServer.models.fnd;

import AngularServer.models.Idenfitiable;

import java.io.Serializable;
import java.util.List;

/**
 * Created by a689638 on 1/29/2016.
 * Copyright (C) 2016 HEB
 *
 * @author Ryan Anders
 *         This software is the confidential and proprietary information
 *         of HEB
 */


public class Item implements Idenfitiable, Serializable{

    public static class Special implements Serializable{
        private String name;
        private Integer level;
        private Boolean active;

        public Special() {
        }

        public Special(String name, Integer level) {
            this.name = name;
            this.level = level;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public Integer getLevel() {
            return level;
        }

        public void setLevel(Integer level) {
            this.level = level;
        }

        public Boolean getActive() {
            return active;
        }

        public void setActive(Boolean active) {
            this.active = active;
        }
    }
    enum UseSkill{
        Brawl, Melee, Lightsaber, RangedL, RangedH, Gunnery
    }
    enum Range{
        Engaged, Short, Medium, Long, Extreme
    }
    private Integer id;
    private String name;
    private UseSkill skill;
    private Range range;
    private Integer damage;
    private Integer critical;
    private Integer encumberance;
    private Integer hardPoints;
    private Integer price;
    private Boolean restricted;
    private Integer rarity;
    private List<Special> specials;


    @Override
    public void setId(Integer id) {
        this.id = id;
    }

    @Override
    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public UseSkill getSkill() {
        return skill;
    }

    public void setSkill(UseSkill skill) {
        this.skill = skill;
    }

    public Range getRange() {
        return range;
    }

    public void setRange(Range range) {
        this.range = range;
    }

    public Integer getDamage() {
        return damage;
    }

    public void setDamage(Integer damage) {
        this.damage = damage;
    }

    public Integer getCritical() {
        return critical;
    }

    public void setCritical(Integer critical) {
        this.critical = critical;
    }

    public Integer getEncumberance() {
        return encumberance;
    }

    public void setEncumberance(Integer emcumberance) {
        this.encumberance = emcumberance;
    }

    public Integer getHardPoints() {
        return hardPoints;
    }

    public void setHardPoints(Integer hardPoints) {
        this.hardPoints = hardPoints;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Boolean getRestricted() {
        return restricted;
    }

    public void setRestricted(Boolean restricted) {
        this.restricted = restricted;
    }

    public Integer getRarity() {
        return rarity;
    }

    public void setRarity(Integer rarity) {
        this.rarity = rarity;
    }

    public List<Special> getSpecials() {
        return specials;
    }

    public void setSpecials(List<Special> specials) {
        this.specials = specials;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Item item = (Item) o;

        return id.equals(item.id);

    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }


}
