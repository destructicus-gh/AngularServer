/**
 * Created by a689638 on 1/29/2016.
 */

(function () {
    'use strict';
    angular.module('routerApp').controller('FNDMapsController', ['MapService', 'MapValues', 'MapElements', 'MasterList', 'Canvas', 'Utilities',
        function (MapService, MapValues, MapElements, MasterList, Canvas, Utilities) {
            var fdm = this;
            /*
             fdm.data = [{
             name: "root1", object: {dataitem1: 1},
             extended: true,
             children: [
             {
             name: "child 1", object: {dataitem1: 2},
             extended: false,
             children: [
             {
             name: "grandchild 1", object: {dataitem1: 3},
             extended: true,
             children: []
             }
             ]
             },
             {
             name: "child 2", object: {dataitem1: 4},
             extended: true,
             children: [
             {
             name: "grandchild 1", object: {dataitem1: 5},
             extended: true,
             children: []
             }, {
             name: "grandchild 2", object: {dataitem1: 6},
             extended: true,
             children: []
             }
             ]
             }
             ]
             }];
             */
            fdm.data = [];


            fdm.currentElement = null;

            fdm.selectMode = null;

            fdm.masterList = MasterList;

            fdm.elementClick = elementClick;
            fdm.setCurrentParent = setCurrentParent;
            fdm.canReparent = canReparent;
            fdm.findLineOtherEnd = findLineOtherEnd;

            testInit();


            function testInit() {
                Canvas.init();
                Canvas.run(nudgeBind);

                var cdim = Canvas.dim();
                var grid = new MapElements.Grid(cdim.height, cdim.width, 50, Canvas.getCanvas());

                var box = new MapElements.SceneBox(
                    "box", MapValues.controlPointConfig, MapValues.boxConfig, 100, 100, 100, 100, Canvas.getCanvas());
                fdm.data.push(box);
            }


            function canReparent(element) {
                if (element == null) return false;
                return element.parent != undefined;
            }

            function setCurrentParent(parent) {
                console.log(fdm.currentElement);
                fdm.currentElement.parent.children = _.filter(fdm.currentElement.parent.children, function (e) {
                    return !(e === fdm.currentElement);
                });
                console.log(fdm.currentElement);
                fdm.currentElement.parent = parent;
                parent.children.push(fdm.currentElement);
            }

            function findLineOtherEnd(line, isFront) {
                return (isFront) ? line.endContainer : line.startContainer;
            }

            function elementClick(element) {
                if (element === fdm.currentElement) {
                    fdm.currentElement = null;
                }
                else {
                    fdm.currentElement = element;
                    if (fdm.currentElement.select) fdm.currentElement.select(true);
                }
                console.log(element);
            }


            function nudgeBind(canvas) {
                function nudgeOrigin(x, y) {
                    MasterList.runFunction(function (list) {
                        _.each(list, function (e) {
                            e.setOrigin(e.origin.x + x, e.origin.y + y);
                        });
                    }, fdm.canvas);
                }

                canvas.bind("keydown", function () {
                    if (_.contains(fdm.canvas.keyboard.getKeysDown(), fdm.canvas.keyboard.ARROW_LEFT)) {
                        nudgeOrigin(50, 0);
                    }
                    if (_.contains(fdm.canvas.keyboard.getKeysDown(), fdm.canvas.keyboard.ARROW_RIGHT)) {
                        nudgeOrigin(-50, 0);
                    }
                    if (_.contains(fdm.canvas.keyboard.getKeysDown(), fdm.canvas.keyboard.ARROW_UP)) {
                        nudgeOrigin(0, 50);
                    }
                    if (_.contains(fdm.canvas.keyboard.getKeysDown(), fdm.canvas.keyboard.ARROW_DOWN)) {
                        nudgeOrigin(0, -50);
                    }
                });
            }


        }
    ])
        .
        service('MapService', ['$http', function ($http) {
            return {};
        }])
        .service('MapValues', function () {
            return {
                controlPointConfig: {radius: 10, fill: "#555"},
                boxConfig: {stroke: "1px #000", cap: "round"},
                objectHoverColor: "#222",
                objectMouseDownColor: "#EEE"
            };
        })
        .service('MasterList', function () {
            var oCanvasObjects = [];
            return {
                getList: function () {
                    return oCanvasObjects;
                },
                push: function (obj) {
                    oCanvasObjects.push(obj)
                },
                runFunction: function (f, canvas) {
                    var ret = f(oCanvasObjects);
                    canvas.redraw();
                }
            };
        });
})();