/**
 * Created by a689638 on 2/19/2016.
 */

(function () {
    'use strict';

    angular.module('routerApp').service('MapElements', ['Utilities', 'MasterList', function (Utilities, MasterList) {
        return {
            SceneElement: SceneElement,
            SceneBox: SceneBox,
            Grid: Grid
        };

        function SceneBox(name, anchorConfigProto, lineConfigProto, x, y, w, h, canvas) {
            this.type = 'box';
            this.name = name;
            this.extended = true;
            this.children = [];
            this.selectable = false;
            this.linesTo = [];
            this.linesFrom = [];
            this.parent = null;
            this.canvas = canvas;

            this.controlsOn = true;

            this.bubble = 2;
            this.snap = 50;
            this.snapOn = true;
            this.select = select;
            this.changeControl = changeControl;

            this._anchors = function (container) {
                var a = {};
                a.tl = initAnchor(x, y, container);
                a.tr = initAnchor(x + w, y, container);
                a.bl = initAnchor(x, y + h, container);
                a.br = initAnchor(x + w, y + h, container);

                a.tl.sx = a.tr;
                a.tl.sy = a.bl;
                a.tr.sx = a.tl;
                a.tr.sy = a.br;

                a.bl.sx = a.br;
                a.bl.sy = a.tl;
                a.br.sx = a.bl;
                a.br.sy = a.tr;

                return a;
            }(this);

            this._lines = function (anchors) {
                var l = {};
                l.top = initLine(anchors.tl, anchors.tr);
                l.bottom = initLine(anchors.br, anchors.bl);
                l.left = initLine(anchors.bl, anchors.tl);
                l.right = initLine(anchors.tr, anchors.br);
                return l;
            }(this._anchors);

            function initAnchor(x, y, container) {
                var config = angular.copy(anchorConfigProto);
                config.x = x;
                config.lastX = x;
                config.y = y;
                config.lastY = y;
                var a = canvas.display.ellipse(config);
                initAnchorDD(a, true);
                MasterList.push(a);
                a.move = move;
                a.defaultFill = a.fill;
                a.clearFill = 'rgba(0, 0, 0, 0.1)';
                a.container = container;

                a.add();

                return a;
            }

            function initAnchorDD(a, bool) {
                if (bool) {
                    a.dragAndDrop({
                        bubble: true,
                        changeZindex: false,
                        move: anchorDDMove,
                        end: snap
                    });
                }
                else {
                    a.dragAndDrop(false);
                }
            }

            function initLine(anchor1, anchor2) {
                var line = canvas.display.line({
                    start: {x: anchor1._.x, y: anchor1._.y},
                    end: {x: anchor2._.x, y: anchor2._.y},
                    stroke: lineConfigProto.stroke,
                    cap: lineConfigProto.cap
                });
                MasterList.push(line);
                line.anchors = [anchor1, anchor2];
                anchor1.lineFrom = line;
                anchor2.lineTo = line;
                canvas.addChild(line);
            }

            function snap() {
                this.x = (this.container.snapOn) ? Utilities.snap(this.x, this.container.snap) : this.x;
                this.y = (this.container.snapOn) ? Utilities.snap(this.y, this.container.snap) : this.y;
                this.lineFrom.start.x = this.x;
                this.lineTo.end.x = this.x;
                this.lineFrom.start.y = this.y;
                this.lineTo.end.y = this.y;

                if (this.container.bubble == 2) {
                    this.sy.x = this.x;
                    this.sx.y = this.y;
                    this.sx.move(false, true);
                    this.sy.move(true, false);

                }
            }

            function changeControl() {
                var bool = this.controlsOn;
                this._anchors.tl._.fill = (bool) ? this._anchors.tl.defaultFill : this._anchors.tl.clearFill;
                this._anchors.tr._.fill = (bool) ? this._anchors.tr.defaultFill : this._anchors.tr.clearFill;
                this._anchors.bl._.fill = (bool) ? this._anchors.bl.defaultFill : this._anchors.bl.clearFill;
                this._anchors.br._.fill = (bool) ? this._anchors.br.defaultFill : this._anchors.br.clearFill;
                this.canvas.redraw();
                initAnchorDD(this._anchors.tl, bool);
                initAnchorDD(this._anchors.tr, bool);
                initAnchorDD(this._anchors.bl, bool);
                initAnchorDD(this._anchors.br, bool);

            }

            function move(moveX, moveY) {
                var x = this.x;
                var y = this.y;
                if (moveX) {
                    this.lineFrom.start.x = x;
                    this.lineTo.end.x = x;
                }
                if (moveY) {
                    this.lineFrom.start.y = y;
                    this.lineTo.end.y = y;
                }

                this.lastX = x;
                this.lastY = y;
            }

            function anchorDDMove() {
                var x = this.x;
                var y = this.y;
                this.lineFrom.start.x = x;
                this.lineFrom.start.y = y;
                this.lineTo.end.x = x;
                this.lineTo.end.y = y;

                if (this.container.bubble == 2) {
                    this.sx.move(false, true);
                    this.sx.y = y;
                    this.sy.move(true, false);
                    this.sy.x = x;
                }

                this.lastX = x;
                this.lastY = y;
            }

            function select(bool) {
                console.log(this);
                console.log(this._anchors.tl._.fill);
                this._anchors.tl._.fill = (bool) ? this._anchors.tl.defaultFill : this._anchors.tl.clearFill;
                this._anchors.tr._.fill = (bool) ? this._anchors.tr.defaultFill : this._anchors.tr.clearFill;
                this._anchors.bl._.fill = (bool) ? this._anchors.bl.defaultFill : this._anchors.bl.clearFill;
                this._anchors.br._.fill = (bool) ? this._anchors.br.defaultFill : this._anchors.br.clearFill;
                console.log(this._anchors.tl._.fill)
                this.canvas.redraw();

            }
        }




        function SceneElement(name, object) {
            this.name = name;
            this.object = object;
            this.extended = true;
            this.children = [];
            this.selectable = false;
            this.linesTo = [];
            this.linesFrom = [];

            this.move = function (x, y) {
                console.log(this.name, "moves");
                this.object.move(x, y);
                _.each(this.linesTo, function (line) {
                    console.log("lineMove");
                    line.end.x += x;
                    line.end.y += y;
                });
                _.each(this.linesFrom, function (line) {
                    line.start.x += x;
                    line.start.y += y;
                });
                _.each(this.children, function (c) {
                    c.move(x, y);
                });
            };
            this.moveTo = function (x, y) {
                this.object.moveTo(x, y);
                _.each(this.linesTo, function (lineBegin) {
                    lineBegin.start.x = x;
                    lineBegin.start.y = y;
                });
                _.each(this.linesFrom, function (lineEnd) {
                    lineEnd.end.x = x;
                    lineEnd.end.y = y;
                });
                _.each(this.children, function (c) {
                    c.moveTo(x, y);
                });
            };

            this.getX = function () {
                return this.object._.x
            };
            this.getY = function () {
                return this.object._.y
            };
            this.setX = function (newX) {
                this.object._.x = newX
            };
            this.setY = function (newY) {
                this.object._.y = newY
            };

        }

        function Grid(h, w, pixPer, canvas) {
            this.lines = [];
            for (var i = 0; i < h; i += pixPer) {
                this.lines.push(line(0, i, w, i));
            }
            for (var j = 0; j < w; j += pixPer) {
                this.lines.push(line(j, 0, j, h));
            }
            function line(x1, y1, x2, y2) {
                var line = canvas.display.line({
                    start: {x: x1, y: y1},
                    end: {x: x2, y: y2},
                    stroke: "1px #888",
                    cap: "round"
                });
                //MasterList.push(line);
                canvas.addChild(line);
                line.zIndex = -1;
                return line;
            }
        }
    }
    ]);
})
();