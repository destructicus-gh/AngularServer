/**
 * Created by a689638 on 2/19/2016.
 */

(function () {
    'use strict';
    angular.module('routerApp').service('Canvas', [function () {
        var canvas;
        function initEngine() {
            var c = $('#stage');
            var ct = c.get(0).getContext('2d');
            var container = $(c).parent();

            //Run function when browser resizes
            $(window).resize( respondCanvas );

            function respondCanvas(){
                c.attr('width', $(container).width() ); //max width
                c.attr('height', $(container).height() ); //max height

                //Call a function to redraw other content (texts, images etc)
                if (canvas)
                    canvas.redraw();
            }

            //Initial call
            respondCanvas();



            canvas = oCanvas.create({canvas: "#stage", background: "#DDD"});
        }
        function ellipse(config){
            return canvas.display.ellipse(config);
        }

        function runFunction(f){
            return f(canvas);
        }

        function getDim(){
            return {width:canvas.width, height:canvas.height};
        }
        return {
            init:initEngine,
            run:runFunction,
            dim:getDim,
            getCanvas:function(){return canvas}
        }
    }]);

})();