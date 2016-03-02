/**
 * Created by a689638 on 1/29/2016.
 */

(function () {
    'use strict';
    angular.module('routerApp').controller('FNDItemController', ['ItemService', 'Utilities', function (ItemService, Utilities) {
        var fdi = this;
        fdi.items = [];
        fdi.currentItem = null;
        fdi.searchString = null;

        fdi.attributeName = attributeName;
        fdi.specialsText = specialsText;
        fdi.openEdit = openEdit;
        fdi.closeEdit = closeEdit;
        fdi.save = save;
        fdi.saveCopy = saveCopy;
        fdi.deleteItem = deleteItem;
        fdi.closeSpecial = closeSpecial;
        fdi.openSpecial = openSpecial;

        fdi.itemsEqual = itemsEqual;

        fdi.specials = [];

        fdi.modalData = {
            isNew:true,
            title:"Edit",
            item:{}
        };
        init();
        function init() {
            ItemService.getAllItems().then(function (raw) {
                console.log("loading items", raw.data);
                fdi.items = raw.data;
            });
            ItemService.getAllSpecial().then(function (raw) {
                console.log("loading specials", raw.data);
                fdi.specials = raw.data;
            });
            $('select').material_select();

        }

        function attributeName(name) {
            if (name == 'hardPoints') return 'Hard Points';
        }

        function specialsText(special) {
            var specialString = "";
            angular.forEach(special, function (element) {
                specialString += element.name + ((element.level) ? ":" + element.level : "") + ", ";
            });
            return specialString.substr(0, specialString.length - 1);
        }

        function openEdit(option){
            if (option == 1){ //new
                ItemService.newItem().then(function(raw){
                    fdi.modalData.item = raw.data;
                    $('#modal1').openModal();
                    $('select').material_select();
                });
            }
            if (option == 2){
                fdi.modalData.item = Utilities.deepCopy(fdi.currentItem, "Copy for edit, item:"+fdi.currentItem.name);
                $('#modal1').openModal();
                $('select').material_select();
            }

        }


        function openSpecial() {
            fdi.modalData.specials = Utilities.deepCopy(fdi.specials, "fdi.specials");
            $('#select-special').openModal();


        }
        function closeSpecial() {
            $('#select-special').closeModal();
            fdi.modalData.specials = null;

        }

        function closeEdit() {
            $('#modal1').closeModal();
            fdi.modalData.item = null;

        }

        function save() {
            console.log("presave", fdi.modalData.item);
            ItemService.saveItem(fdi.modalData.item).then(function(raw){
                console.log("postSave", raw.data);
                ItemService.getAllItems().then(function (raw) {
                    fdi.items = raw.data;
                    $('#modal1').closeModal();
                });
                fdi.currentItem = raw.data;

            });
        }

        function saveCopy() {
            ItemService.saveCopyItem(fdi.modalData.item).then(function(raw){
                ItemService.getAllItems().then(function (raw) {
                    fdi.items = raw.data;
                    $('#modal1').closeModal();
                });

            });
        }
        function deleteItem() {
            Materialize.toast(fdi.currentItem.name+' deleted', 4000);
            ItemService.deleteItem(fdi.currentItem.id).then(function(raw){
                ItemService.getAllItems().then(function (raw) {
                    fdi.items = raw.data;
                    fdi.currentItem = null;
                });

            });
        }
        function itemsEqual(i1, i2){
            return i1==i2;
        }
    }])
        .service('ItemService', ['$http', function ($http) {

            return {
                getAllSpecial:getAllSpecial,
                getAllItems: getAllItems,
                saveItem: saveItem,
                saveCopyItem: saveCopyItem,
                newItem:newItem,
                deleteItem:deleteItem
            };

            function getAllSpecial(){
                return $http.get("/specials");
            }
            function getAllItems() {
                return $http.get('/item');
            }
            function newItem(){
                return $http.get('/item/new');
            }
            function saveItem(item){
                return $http.post('/item', item);
            }
            function saveCopyItem(item){
                item.id=null;
                console.log("copy", item);
                return $http.post('/item', item);
            }

            function deleteItem(id){
                return $http.delete('/item/'+ id);
            }
        }]);

})();