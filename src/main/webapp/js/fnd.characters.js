/**
 * Created by a689638 on 1/29/2016.
 */

(function () {
    'use strict';
    angular.module('routerApp').controller('FNDCharacterController', ['CharacterService', 'Utilities', function (CharacterService, Utilities) {
        var fdc = this;
        fdc.characters = [];
        fdc.currentCharacter = {};
        fdc.searchString = null;
        fdc.modalData = {};

        fdc.skills = [];


        fdc.attributeName = attributeName;
        fdc.openEdit = openEdit;
        fdc.closeEdit = closeEdit;
        fdc.save = save;
        fdc.saveCopy = saveCopy;
        fdc.deleteItem = deleteItem;
        fdc.closeSkills = closeSkills;
        fdc.openSkills = openSkills;
        fdc.pushSkill = pushSkill;
        fdc.skillsEqual = skillsEqual;
        fdc.showNumber = showNumber;

        init();
        function init() {
            CharacterService.getAllCharacters().then(function (raw) {
                console.log("loading items", raw.data);
                fdc.characters = raw.data;
            });
            CharacterService.getAllSkills().then(function (raw) {
                console.log("loading specials", raw.data);
                fdc.skills = raw.data;
            });
            $('select').material_select();

        }

        function attributeName(name) { //TODO fix this
            if (name == 'defense_m') return 'Melee Defense';
            if (name == 'defense_r') return 'Ranged Defense';
            if (name == 'strain_c') return 'Current Strain';
            if (name == 'strain_t') return 'Strain Threshold';
            if (name == 'wound_c') return 'Current Wound';
            if (name == 'wound_t') return 'Wound Threshold';
            return name
        }


        function openEdit(option) {
            if (option == 1) { //new
                CharacterService.newCharacter().then(function (raw) {
                    fdc.modalData.character = raw.data;
                    $('#modal1').openModal();
                    $('select').material_select();
                });
            }
            if (option == 2) {
                fdc.modalData.character = Utilities.deepCopy(fdc.currentCharacter, "Copy for edit, character:" + fdc.currentCharacter.name);
                $('#modal1').openModal();
                $('select').material_select();
            }

        }

        function openSkills() {
            fdc.modalData.skills = Utilities.deepCopy(fdc.skills, "fdc.skills");
            $('#select-special').openModal();


        }

        function closeSkills() {
            $('#select-special').closeModal();
            fdc.modalData.skills = null;

        }

        function closeEdit() {
            $('#modal1').closeModal();
            fdc.modalData.character = null;

        }

        function save() {
            console.log("presave", fdc.modalData.character);
            CharacterService.saveCharacter(fdc.modalData.character).then(function (raw) {
                console.log("postSave", raw.data);
                CharacterService.getAllCharacters().then(function (raw) {
                    fdc.characters = raw.data;
                    $('#modal1').closeModal();
                });
                fdc.currentCharacter = raw.data;

            });
        }

        function saveCopy() {
            CharacterService.saveCopyItem(fdc.modalData.character).then(function (raw) {
                CharacterService.getAllCharacters().then(function (raw) {
                    fdc.characters = raw.data;
                    $('#modal1').closeModal();
                });

            });
        }

        function deleteItem() {
            Materialize.toast(fdc.currentCharacter.name + ' deleted', 4000);
            CharacterService.deleteCharacter(fdc.currentCharacter.id).then(function (raw) {
                CharacterService.getAllCharacters().then(function (raw) {
                    fdc.characters = raw.data;
                    fdc.currentCharacter = null;
                });

            });
        }

        function showNumber(skill) {
            var f = _.findIndex(fdc.modalData.character.skills, function (element) {
                return skillsEqual(skill, element);
            });
            return f != -1;
        }

        function pushSkill(element) {
            return element;
        }

        function skillsEqual(skill1, skill2) {
            if (skill1.skill == null) return false;
            if (skill2.skill == null) return false;
            if (skill1.skill.name == skill2.skill.name) {

                return true;
            }
            else {
                return false
            }
        }

    }])
        .service('CharacterService', ['$http', function ($http) {

            return {
                getAllSkills: getAllSkills,
                getAllCharacters: getAllCharacters,
                saveCharacter: saveCharacter,
                newCharacter: newCharacter,
                saveCopyCharacter: saveCopyCharacter,
                deleteCharacter: deleteCharacter
            };

            function getAllSkills() {
                return $http.get("/skills");
            }

            function getAllCharacters() {
                return $http.get('/character');
            }

            function newCharacter() {
                return $http.get('/character/new');
            }

            function saveCharacter(character) {
                return $http.post('/character', character);
            }

            function saveCopyCharacter(character) {
                character.id = null;
                console.log("copy", character);
                return $http.post('/character', character);
            }

            function deleteCharacter(id) {
                return $http.delete('/character/' + id);
            }
        }]);

})();