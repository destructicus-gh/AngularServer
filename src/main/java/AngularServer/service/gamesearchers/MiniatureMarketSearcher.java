package AngularServer.service.gamesearchers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by a689638 on 3/3/2016.
 * Copyright (C) 2016 HEB
 *
 * @author Ryan Anders
 *         This software is the confidential and proprietary information
 *         of HEB
 */
class MMSearchResult {
    MMResultItem[] results;

    public MMResultItem[] getResults() {
        return results;
    }

    public void setResults(MMResultItem[] results) {
        this.results = results;
    }
}

class MMResultItem {
    String name;
    String url;
    String image_url;
    String promo_price;
    String normal_price;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getImage_url() {
        return image_url;
    }

    public void setImage_url(String image_url) {
        this.image_url = image_url;
    }

    public String getPromo_price() {
        return promo_price;
    }

    public void setPromo_price(String promo_price) {
        this.promo_price = promo_price;
    }

    public String getNormal_price() {
        return normal_price;
    }

    public void setNormal_price(String normal_price) {
        this.normal_price = normal_price;
    }

    public GameData toGameData() {
        GameData g = new GameData();
        g.setName(this.getName());
        g.setLink(this.getUrl());
        g.setPicture(this.getImage_url());
        g.setPrice(this.promo_price);
        return g;
    }
}


public class MiniatureMarketSearcher extends GameSearcher {

    public boolean hasRun = false;
    public String urlContents = "";

    public MiniatureMarketSearcher() {
    }

    @Override
    public String getName() {
        return "Miniature Market";
    }

    @Override
    public String getPrice() {
        return null;
    }

    public String generateUrl(String search) {
        return "http://api.searchspring.net/api/search/search.json?websiteKey=6f9c319d45519a85863e68be9c3f5d81&q=" + search.replace(" ", "+") + "&resultsFormat=native&resultsPerPage=100&resultLayout=grid";
    }

    public GameSite search(String search) {

        List<GameData> ret = new ArrayList<>();
        RestTemplate restTemplate = new RestTemplate();
        String fooResourceUrl = this.generateUrl(search);
        ResponseEntity<String> response =
                restTemplate.getForEntity(fooResourceUrl + "/1", String.class);

        MMSearchResult foo = restTemplate.getForObject(fooResourceUrl + "/1", MMSearchResult.class);
        GameSite g = new GameSite();
        g.setName("Miniature Market");
        for (MMResultItem mr : foo.getResults()) {
            ret.add(mr.toGameData());
        }

        g.setGameDatas(ret.toArray(new GameData[ret.size()]));


        return g;
    }


}
