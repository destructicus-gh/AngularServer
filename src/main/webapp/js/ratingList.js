var app = angular.module('routerApp');

app.controller('RestaurantListController', ['$scope', '$log', '$http', function ($scope, $log, $http) {
    var controller = this;


    $scope.restaurants = [];
    $scope.names = ['David', 'Stephen', 'Ryan', 'John'];
    $http.get('http://172.19.214.57:8080/restaurants').then(function (data) {

            $scope.restaurants = data.data;
            //$log.debug(data);
            controller.sortByName();
            //$log.debug($scope.restaurants.length)
        }, function (data) {
            //$log.debug($scope.restaurants.length);
            //$log.debug(data);

        }
    );

    var filterFloat = function (value) {
        var f = 0;
        if (/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/
                .test(value)) {

            f = Number(value);
            if (f < 0) f = 0;
            if (f > 10) f = 10;
        }
        return f;
    }


    this.average = function (array) {
        //$log.debug(array);
        var sum = 0;
        var di = 0;
        array.forEach(
            function (value) {
                if (value >= 0) {
                    sum += value;
                    di++;
                }
            }
        );

        return Math.round(sum / di * 100) / 100;

    };
    $scope.tempRestaurant = {
        name: "La Trasha",
        ratings: [1, 2, 3, 4],
        visitedTime:1
    };


    $scope.tempAvg = this.average($scope.tempRestaurant.ratings);
    $scope.average = this.average;

    $scope.resetTempAvg = function () {
       // $log.debug("reset");

        $scope.tempRestaurant.ratings = Array.from($scope.tempRestaurant.ratings,
            function (value) {
                return filterFloat(value);
            });

        $scope.tempAvg = controller.average($scope.tempRestaurant.ratings);

        //$scope.tempAvg = controller.average($scope.tempRestaurant.ratings);
        //$log.debug($scope.tempAvg);
    };

    this.sort_by = function (field, reverse, primer) {
        var key = function (x) {
            return primer ? primer(x[field]) : x[field]
        };

        return function (a, b) {
            var A = key(a), B = key(b);
            return ( (A < B) ? -1 : ((A > B) ? 1 : 0) ) * [-1, 1][+!!reverse];
        }
    };
    this.sortByName = function () {
        return $scope.restaurants.sort(controller.sort_by('name', true, function (a) {
            return a.toUpperCase()
        }));
    };
    this.sortByAverage = function () {
        return $scope.restaurants.sort(controller.sort_by('ratings', false, function (a) {
            return controller.average(a);
        }));
    };
    $scope.sortOptions = [
        {
            name: 'Name A-Z',
            callback: controller.sort_by('name', true, function (a) {
                return a.toUpperCase()
            }),
            active: true
        },
        {
            name: 'Name Z-A',
            callback: controller.sort_by('name', false, function (a) {
                return a.toUpperCase()
            }),
            active: false
        },
        {
            name: 'Avg 1-10',
            callback: controller.sort_by('ratings', true, function (a) {
                return controller.average(a);
            }),
            active: false
        },
        {
            name: 'Avg 10-1',
            callback: controller.sort_by('ratings', false, function (a) {
                return controller.average(a);
            }),
            active: false
        }
    ];


    $scope.addMode = false;
    $scope.addSave = function(){
        if($scope.addMode){

        }
        else{ //is in edit mode, needs to save
            $log.debug($scope.tempRestaurant);
            $http.post("http://172.19.214.57:8080/newRestaurant", $scope.tempRestaurant).then(
                function(data){
                    $log.debug(data);
                    $http.get('http://172.19.214.57:8080/restaurants').then(function (data) {

                            $scope.restaurants = data.data;
                            $log.debug(data);
                            controller.sortByName();
                            $log.debug($scope.restaurants.length)
                        }, function (data) {
                            $log.debug($scope.restaurants.length);
                            $log.debug(data);

                        }
                    );
                    $scope.tempRestaurant = {
                        name: "La Trasha",
                        ratings: [1, 2, 3, 4],
                        visitedTime:1
                    };
                }
            );

        }


        $scope.addMode = !$scope.addMode ;
    }


}]);

app.directive('restaurantList', function () {
    return {
        restrict: "E",
        templateUrl: "app/components/restaurantRating/ratingListDirective.html",
        controller: 'RestaurantListController',
        controllerAs: 'restaurantList'
    };
});