var routerApp = angular.module('routerApp', ['ui.router', 'ngAnimate']);

routerApp.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('paperjs', {
            url: '/paperjs',
            templateUrl: 'views/paperjs-test.html'
        })
        .state('home', {
            url: '/home',
            templateUrl: 'views/partial-home.html'
        })


        // nested list with custom controller
        .state('home.list', {
            url: '/list',
            templateUrl: '/views/partial-home-list.html',
            controller: function ($scope) {
                this.callb = function(elem){
                    this.str = elem.srcElement.id;
                    elem.srcElement.tagged = true;
                    console.log(elem);
                };
                this.calln = function(elem){
                    elem.srcElement.tagged = false;
                    console.log(elem);
                };
                this.clik = function(elem){

                    console.log(elem);
                };
                this.str = "sdf";
            },
            controllerAs:"vm"
        })

        // nested list with just some random string data
        .state('home.paragraph', {
            url: '/paragraph',
            template: 'I could sure use a drink right now.',
        })


        .state('gamesearch', {
            url: '/gamesearch',
            templateUrl: '/views/game-search.html',
            controller: 'GameSearchController as vm'
        })
        .state('one', {
            url: '/one',
            templateUrl: '/views/onemeth/main.html',
            controller: 'OneMethFlowController as flow'

        })
        .state('fnd', {
            url: '/fnd',
            templateUrl: '/views/force-destiny-top.html',
            controller: 'ForceDestinyTopController as fdt'

        })
        .state('fnd.items', {
            url: '/items',
            templateUrl:'/views/fnd/items.html',
            controller: 'FNDItemController as fdi'
        })
        .state('fnd.maps', {
            url: '/maps',
            templateUrl:'/views/fnd/maps.html',
            controller: 'FNDMapsController as fdm'
        })
        .state('fnd.characters', {
            url: '/characters',
            templateUrl:'/views/fnd/characters.html',
            controller: 'FNDCharacterController as fdc'
        })

        .state('testgame', {
            url: '/testgame',
            templateUrl: '/views/test-game.html',
            controller: 'TestGameController as vm'
        })
        .state('ratings', {
            url: '/ratings',
            views: {
                '': {
                    templateUrl: "views/ratingList.html"
                },
                'rowOne@ratings': {
                    templateUrl: 'views/restaurantlist.html',
                    controller: 'RestaurantListController',
                    controllerAs: 'restaurantList'
                },
                'rowTwo@ratings': {
                    template: "All the places we've been."
                }
            }
        });

}); // closes $routerApp.config()


// let's define the scotch controller that we call up in the about state
routerApp.controller('scotchController', function ($scope) {

    $scope.message = 'test';

    $scope.scotches = [
        {
            name: 'Macallan 12',
            price: 50
        },
        {
            name: 'Chivas Regal Royal Salute',
            price: 10000
        },
        {
            name: 'Glenfiddich 1937',
            price: 20000
        }
    ];

});
