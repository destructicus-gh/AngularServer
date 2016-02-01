package AngularServer.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;

/**
 * Created by a689638 on 11/24/2015.
 * Copyright (C) 2015 HEB
 *
 * @author Ryan Anders
 *         This software is the confidential and proprietary information
 *         of HEB
 */
public class URLTools {
    public static String getURL(String stringUrl) {
        try {
            URL url = new URL(stringUrl);
            URLConnection conn = url.openConnection();
            BufferedReader br = new BufferedReader(
                    new InputStreamReader(conn.getInputStream()));
            StringBuilder sb = new StringBuilder();
            String inputLine;
            while ((inputLine = br.readLine()) != null) {
                sb.append(inputLine);
            }
            br.close();
            return sb.toString();
        } catch (IOException e) {
            return "";
        }

    }
}
