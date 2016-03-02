package AngularServer.models.fnd;

/**
 * Created by a689638 on 2/1/2016.
 * Copyright (C) 2016 HEB
 *
 * @author Ryan Anders
 *         This software is the confidential and proprietary information
 *         of HEB
 */
public class SkillType {
    public enum SkillClass{
        General, Combat, Knowledge, Custom
    }
    String name;
    SkillClass skillClass;
    String characteristic;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public SkillClass getSkillClass() {
        return skillClass;
    }

    public void setSkillClass(SkillClass skillClass) {
        this.skillClass = skillClass;
    }

    public String getCharacteristic() {
        return characteristic;
    }

    public void setCharacteristic(String characteristic) {
        this.characteristic = characteristic;
    }
}
