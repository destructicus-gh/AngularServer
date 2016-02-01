package AngularServer.service.gamesearchers;

/**
 * Created by a689638 on 11/24/2015.
 * Copyright (C) 2015 HEB
 *
 * @author Ryan Anders
 *         This software is the confidential and proprietary information
 *         of HEB
 */
public class GameData {
    public String name;
    public String link;
    public String picture;
    public String price;


    @Override
    public String toString() {
        return "GameData{" +
                "name='" + name + '\'' +
                ", link='" + link + '\'' +
                ", picture='" + picture + '\'' +
                ", price='" + price + '\'' +
                '}';
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }
}
