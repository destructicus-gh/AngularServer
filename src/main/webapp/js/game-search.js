/**
 * Created by a689638 on 11/24/2015.
 */
(function () {
    'use strict';


    angular.module('routerApp').controller('GameSearchController', ['$log', '$http', function ($log, $http) {
        var vm = this;
        vm.text = "here";
        vm.sites = [{
            gameDatas: [
                {name: "Name - A game of gaming", link: "http://www.google.com", price: "3.50"}
            ],
            name: "Gamestop",
            current:{name: "Name - A game of gaming", link: "http://www.google.com", price: "3.50"}
        }];
        vm.searchString = {search: "re"};
        vm.goTo = goTo;
        vm.search = search;


        function search() {
            $http.post('http://172.19.214.57:8080/search', vm.searchString).then(function (data) {
                    $log.debug("success", vm.sites);
                    vm.sites = data.data;


                    vm.sites.forEach(function (currentValue, index) {

                        if (currentValue.gameDatas.length > 0)
                            currentValue.current = currentValue.gameDatas[0];
                    });
                    $log.debug("success", vm.sites);
                }, function (data) {
                    $log.debug("error:", data);
                }
            );
        }

        function goTo(arg1, arg2) {
            vm.sites.forEach(function(curr, ind, arr){
                if (curr == arg1){
                    curr.current = arg2;
                }
            });
            $log.debug("success", arg1, arg2);
        }

    }]).directive('ngEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.ngEnter);
                    });
                    event.preventDefault();
                }
            });
        };
    });
})();