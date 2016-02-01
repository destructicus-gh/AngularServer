package AngularServer.runnables;

import AngularServer.service.gamesearchers.CardHausSearcher;
import AngularServer.service.gamesearchers.GameData;

/**
 * Created by a689638 on 11/24/2015.
 * Copyright (C) 2015 HEB
 *
 * @author Ryan Anders
 *         This software is the confidential and proprietary information
 *         of HEB
 */
public class Tester {
    public static void main(String[] args){
        CardHausSearcher cardHausSearcher = new CardHausSearcher();
        cardHausSearcher.fetch("bang");
        for (GameData g: cardHausSearcher.getGameData()){
            System.out.println(g);
        }
    }
}
