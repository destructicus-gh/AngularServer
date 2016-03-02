package AngularServer.models.fnd;

import java.io.Serializable;

/**
 * Created by a689638 on 2/1/2016.
 * Copyright (C) 2016 HEB
 *
 * @author Ryan Anders
 *         This software is the confidential and proprietary information
 *         of HEB
 */
public class Characteristics implements Serializable{
    Integer brawn;
    Integer agility;
    Integer intellect;
    Integer cunning;
    Integer willpower;
    Integer presence;

    public Integer getBrawn() {
        return brawn;
    }

    public void setBrawn(Integer brawn) {
        this.brawn = brawn;
    }

    public Integer getAgility() {
        return agility;
    }

    public void setAgility(Integer agility) {
        this.agility = agility;
    }

    public Integer getIntellect() {
        return intellect;
    }

    public void setIntellect(Integer intellect) {
        this.intellect = intellect;
    }

    public Integer getCunning() {
        return cunning;
    }

    public void setCunning(Integer cunning) {
        this.cunning = cunning;
    }

    public Integer getWillpower() {
        return willpower;
    }

    public void setWillpower(Integer willpower) {
        this.willpower = willpower;
    }

    public Integer getPresence() {
        return presence;
    }

    public void setPresence(Integer presence) {
        this.presence = presence;
    }
}
