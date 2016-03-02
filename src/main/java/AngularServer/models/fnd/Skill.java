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
    SkillType skill;
    Boolean isCareer;
    Integer level;

    public SkillType getSkill() {
        return skill;
    }

    public void setSkill(SkillType skill) {
        this.skill = skill;
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

        return !(skill != null ? !skill.equals(skill.skill) : skill.skill != null);

    }

    @Override
    public int hashCode() {
        return skill != null ? skill.hashCode() : 0;
    }
}
