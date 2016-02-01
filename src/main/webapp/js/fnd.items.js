/**
 * Created by a689638 on 1/29/2016.
 */

(function () {
    'use strict';
    angular.module('routerApp').controller('FNDItemController', ['ItemService', function (ItemService) {
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

        fdi.modalData = {
            isNew:true,
            title:"Edit",
            item:{}
        };
        init();
        function init() {
            ItemService.getAllItems().then(function (raw) {
                console.log(raw.data);
                fdi.items = raw.data;
            })
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
                });
            }
            if (option == 2){
                fdi.modalData.item=fdi.currentItem;
                $('#modal1').openModal();
            }

        }

        function closeEdit() {
            $('#modal1').closeModal();
            fdi.modalData.item=null;

        }

        function save() {
            console.log("presave", fdi.modalData.item);
            ItemService.saveItem(fdi.modalData.item).then(function(raw){
                console.log("postSave", raw.data);
                ItemService.getAllItems().then(function (raw) {
                    fdi.items = raw.data;
                    $('#modal1').closeModal();
                });

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
    }])
        .service('ItemService', ['$http', function ($http) {

            return {
                getAllItems: getAllItems,
                saveItem: saveItem,
                saveCopyItem: saveCopyItem,
                newItem:newItem,
                deleteItem:deleteItem
            };
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
                return $http.post('/item', item);
            }

            function deleteItem(id){
                return $http.delete('/item/'+ id);
            }
        }]);

})();