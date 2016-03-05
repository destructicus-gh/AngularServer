package AngularServer.service.gamesearchers;

/**
 * Created by a689638 on 11/24/2015.
 * Copyright (C) 2015 HEB
 *
 * @author Ryan Anders
 *         This software is the confidential and proprietary information
 *         of HEB
 */
public abstract class GameSearcher {
    abstract String getName();

    abstract String getPrice();

    public static CardHausSearcher getCardHausSearcher() {
        return new CardHausSearcher();
    }

    public static MiniatureMarketSearcher getMiniatureMarketSearcher() {
        return new MiniatureMarketSearcher();
    }
}
