package AngularServer.service.gamesearchers;

/**
 * Created by a689638 on 11/25/2015.
 * Copyright (C) 2015 HEB
 *
 * @author Ryan Anders
 *         This software is the confidential and proprietary information
 *         of HEB
 */
public class GameSite {
    String name;
    String link;
    GameData[] gameDatas;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public GameData[] getGameDatas() {
        return gameDatas;
    }

    public void setGameDatas(GameData[] gameDatas) {
        this.gameDatas = gameDatas;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }
}
