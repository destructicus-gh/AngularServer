package AngularServer.controller;


import AngularServer.models.SearchCriteria;
import AngularServer.service.gamesearchers.CardHausSearcher;
import AngularServer.service.gamesearchers.GameSite;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by a689638 on 9/17/2015.
 * Copyright (C) 2015 HEB
 *
 * @author Ryan Anders
 *         This software is the confidential and proprietary information
 *         of HEB
 */
@Controller
public class GameSearchController {


    @RequestMapping(value = "/search", method = RequestMethod.POST)
    public
    @ResponseBody
        //GameData[] search(HttpServletRequest request) {
    GameSite[] search(@RequestBody SearchCriteria request) {
        //String search = request.getParameter("search");
        String search = request.getSearch();
        //for (Map.Entry<String, String[]> k: request.getParameterMap().entrySet()){
        //    System.out.println(k.getKey()+":"+ Arrays.toString(k.getValue()));
        //}
        System.out.println(search);
        if (search == null) {
            return new GameSite[0];
        }
        CardHausSearcher c = new CardHausSearcher();
        c.fetch(search);
        GameSite cardHaus = new GameSite();
        cardHaus.setName("CardHaus");
        cardHaus.setGameDatas(c.getGameData());
        GameSite[] ret = new GameSite[1];
        ret[0] = cardHaus;
        return ret;

    }


}
