/**
 * Created by a689638 on 12/2/2015.
 */
(function () {
    'use strict';
    angular.module('routerApp').controller('TestGameController', ['$log', '$http', function ($log, $http) {
        var vm = this;
        vm.otherPlayers = initTestOtherPlayers();
        vm.options = initOptions();
        vm.testText = "";
        vm.player = {
            name: "__Name",
            id: 123790,
            cards: initPlayerCards()
        };
        vm.chatString = "";
        vm.chats = [];
        vm.wildColor = {};


        vm.playCard = playCard;

        vm.nowCard = new Card('#FF0000', '#FF0000', 6, 'red');
        vm.faceDownCard = new Card('#000000', '#000000', 'UNO', 'null');

        vm.testCallBack = testCallBack;
        vm.sendChat = sendChat;


        function initTestOtherPlayers() {
            return [
                {
                    name: "Player 1",
                    otherData: [
                        {title: "Cards", data: 4},
                        {title: "Points", data: 2}
                    ]
                },
                {
                    name: "Player 2",
                    otherData: [
                        {title: "Cards", data: 6},
                        {title: "Points", data: 5}
                    ]
                }, {
                    name: "Player 3",
                    otherData: [
                        {title: "Cards", data: 8},
                        {title: "Points", data: 1}
                    ]
                }
            ];
        }

        function initOptions() {
            return [
                {
                    title: "Play", callback: testCallBack, order: 1, active: false
                },
                {
                    title: "Next", callback: testCallBack, order: 3, active: false
                },
                {
                    title: "Attack?", callback: testCallBack, order: 2, active: false
                },
                {
                    title: "Nope", callback: testCallBack, order: 4, active: false
                }];
        }

        function initPlayerCards() {
            return [

                new Card('#DD0000', '#FF0000', '5', 'red'),
                new Card('#0000DD', '#0000FF', '2', 'blue'),
                new Card('#1A1A1A', '#000000', 'W', 'black')
            ];
        }

        function Background(arg) {
            return {'background-color': arg};
        }

        function Card(colorOn, colorOff, text, colorText) {
            this.style = Background(colorOff);
            this.styleon = Background(colorOn);
            this.styleoff = Background(colorOff);
            this.text = text;
            this.color = colorText;
            this.showSecondary = false;
            this.callback = vm.testCallBack;
        }

        function testCallBack(arg) {
            $log.debug(arg);
            vm.testText = arg;
        }

        function makeChoice(arg){
            //send to backend
            $('#modal').closeModal();
        }

        function playCard(card) {

            if (card.text == 'W'||card.text == 'W+4'){
                $('#modal1').openModal();
            }
            else{
                vm.wildColor = {};
            }

            if (!((card.color == vm.nowCard.color)
                || (card.text == vm.nowCard.text)
                || (card.text == 'W')
                || (card.text == 'W+4'))) {
                return;
            }
            card.style = card.styleoff;
            vm.nowCard = card;
            var messagedata = {
                id: vm.player.id,
                card: card
            };
            var index = vm.player.cards.indexOf(card);
            if (index > -1) {
                vm.player.cards.splice(index, 1);
            }
            vm.wildColor = card.style;
            //backend send

        }

        function sendChat() {
            //backend send
            vm.chats.push({text: vm.chatString.slice(0), name: vm.player.name});
            vm.chatString = "";
        }

    }])
})();