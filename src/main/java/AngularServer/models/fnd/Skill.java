package AngularServer.models.fnd;

/**
 * Created by a689638 on 2/1/2016.
 * Copyright (C) 2016 HEB
 *
 * @author Ryan Anders
 *         This software is the confidential and proprietary information
 *         of HEB
 */
public class Skill {
    SkillType name;
    Boolean isCareer;
    Integer level;

    public SkillType getName() {
        return name;
    }

    public void setName(SkillType name) {
        this.name = name;
    }

    public Boolean getIsCareer() {
        return isCareer;
    }

    public void setIsCareer(Boolean isCareer) {
        this.isCareer = isCareer;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Skill skill = (Skill) o;

        return !(name != null ? !name.equals(skill.name) : skill.name != null);

    }

    @Override
    public int hashCode() {
        return name != null ? name.hashCode() : 0;
    }
}
