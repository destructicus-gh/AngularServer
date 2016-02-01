package AngularServer.models;

import java.util.Arrays;
import java.util.List;

/**
 * Created by a689638 on 9/22/2015.
 * Copyright (C) 2015 HEB
 *
 * @author Ryan Anders
 *         This software is the confidential and proprietary information
 *         of HEB
 */
public class Restaurant {
    public  int visitedTime;
    public  String name;
    public  double[] ratings;
    public Restaurant(){
        this.visitedTime = 1;
        this.name = "Broken Insert";
        this.ratings = new double[]{0,0,0,0};
    }

    public Restaurant(int visitedTime, String name, double[] ratings) {
        this.visitedTime = visitedTime;
        this.name = name;
        this.ratings = ratings;
    }
    public Restaurant(String name, int visitedTime, double[] ratings) {
        this.visitedTime = visitedTime;
        this.name = name;
        this.ratings = ratings;
    }

    public void setVisitedTime(int visitedTime) {
        this.visitedTime = visitedTime;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setRatings(List<Double> ratings) {
        for (int i: new int[]{0,1,2,3}){
            this.ratings[i] = ratings.get(i);
        }
    }
/*
    public void setRatings(int a){
        this.ratings = new double[]{3,3,3,3};
    }
    */
    public int getVisitedTime() {
        return visitedTime;
    }

    public String getName() {
        return name;
    }

    public double[] getRatings() {
        return ratings;
    }

    @Override
    public String toString() {
        return "Restaurant{" +
                "visitedTime=" + visitedTime +
                ", name='" + name + '\'' +
                ", ratings=" + Arrays.toString(ratings) +
                '}';
    }
}
