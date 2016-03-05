package AngularServer.controller;


import AngularServer.models.SearchCriteria;
import AngularServer.service.gamesearchers.CardHausSearcher;
import AngularServer.service.gamesearchers.GameSearcher;
import AngularServer.service.gamesearchers.GameSite;
import AngularServer.service.gamesearchers.MiniatureMarketSearcher;
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
    public @ResponseBody GameSite[] search(@RequestBody SearchCriteria request) {
        String search = request.getSearch();

        System.out.println(search);
        if (search == null) {
            return new GameSite[0];
        }
        GameSite[] ret = new GameSite[2];

        CardHausSearcher c = GameSearcher.getCardHausSearcher();
        ret[0] = c.search(search);

        MiniatureMarketSearcher m = GameSearcher.getMiniatureMarketSearcher();
        ret[1] = m.search(search);

        return ret;
    }


}
