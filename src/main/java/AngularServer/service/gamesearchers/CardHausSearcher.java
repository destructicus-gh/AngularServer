package AngularServer.service.gamesearchers;

import AngularServer.util.URLTools;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by a689638 on 11/24/2015.
 * Copyright (C) 2015 HEB
 *
 * @author Ryan Anders
 *         This software is the confidential and proprietary information
 *         of HEB
 */
public class CardHausSearcher extends GameSearcher {
    public boolean hasRun = false;
    public String urlContents = "";

    static final String rowRegex = "(?:<tr.*?)class=\"product_row\"(?:.*?tr>)";

    public CardHausSearcher(){

    }


    @Override
    public String getName() {
        return "CardHaus";
    }

    @Override
    public String getPrice() {
        return null;
    }

    public void statusCheck(){
        if (!hasRun){
            throw new IllegalStateException("Data has not been fetched");
        }
    }

    public void fetch(String search){
        //statusCheck();
        urlContents = URLTools.getURL(generateUrl(search));
        hasRun = true;
    }

    public String generateUrl(String search){
        return "http://www.cardhaus.com/products/search?query="+search.replace(" ", "+")+"&x=0&y=0";
    }


    public GameData[] getGameData(){
        Pattern p = Pattern.compile("(<tr.*?product_row.*?</tr>)");
        Matcher m = p.matcher(this.urlContents);
        List< GameData> ret = new ArrayList<>();
        while (m.find()){
            GameData gd = new GameData();
            String ffr = m.group();
            Matcher mm = Pattern.compile("(?:href=\")(.*?)\"").matcher(ffr);
            try{
                mm.find();
                gd.picture = mm.group(1);
                mm.find();
                gd.link = "http://www.cardhaus.com"+mm.group(1);

            }catch (Exception e){
                continue;
            }
            mm = Pattern.compile("\\$\\d{1,3}\\.\\d{2}(?!</span>)").matcher(ffr);
            if (mm.find())
                gd.price = mm.group();
            mm = Pattern.compile("(?:<td w.*?<a href=\".*?>)(.*?)(?:</a>)").matcher(ffr);
            if (mm.find())
                gd.name = mm.group(1);
            ret.add(gd);
        }
        return ret.toArray(new GameData[ret.size()]);
    }

    public GameSite search(String search){
        this.fetch(search);
        GameSite cardHaus = new GameSite();
        cardHaus.setName("CardHaus");
        cardHaus.setGameDatas(this.getGameData());
        return cardHaus;
    }
}
