/**
 * Created by a689638 on 3/1/2016.
 */

(function () {
    'use strict';
    angular.module('routerApp').controller('OneMethFlowController', ['ElementRetrievalService', function (ER) {
        var flow = this;
        flow.ready = false;

        init();

        function init() {
            console.log(ER.getById("1-1"));
            flow.ready = true;
        }
    }])
        .service('ElementRetrievalService', ['$window', function ($window) {
            var document = $window.document;
            return {
                getById: function (id) {
                    angular.element(document).ready(function () {
                        document.getElementById('1-1').innerHTML = 'Hello';
                    });
                    console.log($window, document,document.getElementById(id) );
                    return document.getElementById(id);
                }
            }
        }]);
})();