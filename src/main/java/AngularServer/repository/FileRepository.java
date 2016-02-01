package AngularServer.repository;

import AngularServer.models.Idenfitiable;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

/**
 * Created by a689638 on 1/29/2016.
 * Copyright (C) 2016 HEB
 *
 * @author Ryan Anders
 *         This software is the confidential and proprietary information
 *         of HEB
 */

public class FileRepository<E extends Idenfitiable> implements Serializable {
    public class IdGen implements Serializable {
        Integer next = 0;
        LinkedList<Integer> backflow = new LinkedList<>();

        public IdGen() {
        }

        Integer nextNumber() {
            return backflow.isEmpty() ? next++ : backflow.remove(0);
        }

        void giveBack(Integer old) {
            backflow.add(old);
        }

        public Integer getNext() {
            return next;
        }

        public void setNext(Integer next) {
            this.next = next;
        }

        public LinkedList<Integer> getBackflow() {
            return backflow;
        }

        public void setBackflow(LinkedList<Integer> backflow) {
            this.backflow = backflow;
        }
    }

    private IdGen ids = new IdGen();

    private List<E> items = new ArrayList<>();
    private String name;
    private File storageLocation;
    private ObjectMapper mapper = new ObjectMapper();

    public FileRepository() {
    }

    public FileRepository(String name, File storageLocation) {
        this.name = name;
        this.storageLocation = new File(storageLocation.getAbsolutePath()+'/'+this.name + ".json");
        readFromFile();
    }

    private void printError(String error) {
        System.out.println("error in:" + this.name + "--" + error);
    }

    public void writeToFile() {

        try {
            mapper.writerWithDefaultPrettyPrinter().writeValue(storageLocation, this);
        } catch (FileNotFoundException e) {
            printError("No File, Default to no things. File:"+storageLocation.getAbsolutePath());
        } catch (IOException e) {
            printError("Something else failed, " + e.toString());
        }
    }

    public void readFromFile() {
        try {
            FileRepository temp = mapper.readValue(storageLocation, new TypeReference<FileRepository<E>>(){});
            this.ids = temp.getIds();
            this.items = temp.getItems();
        } catch (FileNotFoundException e) {
            printError("No File, Default to no things. File:"+storageLocation.getAbsolutePath());
            writeToFile();
        } catch (IOException e) {
            printError("Something else failed, " + e.toString());
        }
    }

    public List<E> getItems() {
        return items;
    }

    public E add(E item) {
        if (item.getId() == null) {
            System.out.println("adding item without id");
            item.setId(ids.nextNumber());
        } else {
            this.items.remove(item);
        }
        items.add(item);
        return item;
    }

    public Integer remove(int index) {
        Iterator<E> it = items.iterator();
        while (it.hasNext()) {
            if (it.next().getId() == index) {
                it.remove();
                ids.giveBack(index);
            }
        }
        return index;
    }

    public IdGen getIds() {
        return ids;
    }

    public void setIds(IdGen ids) {
        this.ids = ids;
    }

    public void setItems(List<E> items) {
        this.items = items;
    }
}
