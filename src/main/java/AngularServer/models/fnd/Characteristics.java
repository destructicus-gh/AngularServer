package AngularServer.models.fnd;

import java.io.Serializable;
import java.util.Map;

/**
 * Created by a689638 on 2/1/2016.
 * Copyright (C) 2016 HEB
 *
 * @author Ryan Anders
 *         This software is the confidential and proprietary information
 *         of HEB
 */
public class Characteristics implements Serializable{
    public enum Characteristic{
        Brawn, Agility, Intellect, Cunning, Willpower, Presence
    }
    Map<Characteristic, Integer> c;

    private static Characteristic getSafe(String characteristic){
        try{
            return Characteristic.valueOf(characteristic);
        }catch (Exception e){
            return null;
        }
    }

    public Integer getCharacteristic(Characteristic characteristic){
        return c.get(characteristic);
    }
    public Integer getCharacteristic(String characteristic){
        Characteristic ch = getSafe(characteristic);
        return (ch == null)?null:getCharacteristic(ch);
    }
    public Boolean setCharacteristic(String characteristic, Integer value){
        Characteristic ch = getSafe(characteristic);

        return (ch == null||c.containsKey(ch))?null:c.put(ch, value)==null;

    }

}
