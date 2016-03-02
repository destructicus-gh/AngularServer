/**
 * Created by a689638 on 2/19/2016.
 */
function addShape() {
    var center = fdm.canvas.display.ellipse({
        x: fdm.canvas.width / 2,
        y: fdm.canvas.height / 2,
        radius: 10,
        fill: "#444"
    });
    var container = new MapElements.SceneElement("Center", center);
    makeShape(container);
    return container;
}

function addOtherShape() {
    var center = fdm.canvas.display.ellipse({
        x: fdm.canvas.width / 4,
        y: fdm.canvas.height / 3,
        radius: 10,
        fill: "#441"
    });
    var container = new MapElements.SceneElement("NC", center);
    makeShape(container);
    return container;
}

function addOtherOtherShape() {
    var center = fdm.canvas.display.ellipse({
        x: fdm.canvas.width / 3,
        y: fdm.canvas.height / 6,
        radius: 10,
        fill: "#411"
    });
    var container = new MapElements.SceneElement("NCC", center);
    makeShape(container);
    return container;
}


var center = addShape();
var nc = addOtherShape();
var ncc = addOtherOtherShape();

nc.parent = center;
ncc.parent = center;

var line = fdm.canvas.display.line({
    start: {x: center.getX(), y: center.getY()},
    end: {x: ncc.getX(), y: ncc.getY()},
    stroke: "5px #0aa",
    cap: "round"
});
line.startContainer = center;
line.endContainer = ncc;

center.linesFrom.push(line);
ncc.linesTo.push(line);

fdm.canvas.addChild(line);


var line2 = fdm.canvas.display.line({
    start: {x: nc.getX(), y: nc.getY()},
    end: {x: ncc.getX(), y: ncc.getY()},
    stroke: "5px #0aa",
    cap: "round"
});
line2.startContainer = nc;
line2.endContainer = ncc;

nc.linesFrom.push(line2);
ncc.linesTo.push(line2);

fdm.canvas.addChild(line2);

center.children.push(nc);
center.children.push(ncc);
fdm.data.push(center);


function hoverClickColor(container) {
    var shape = container.object;
    shape.backupFill = shape.fill;
    shape.bind("mouseenter", function () {
        this.fill = MapValues.objectHoverColor;
        this.fill = (this.mouseDown) ? MapValues.objectMouseDownColor : MapValues.objectHoverColor;
        this.mouseOver = true;
        fdm.canvas.redraw();
    }).bind("mouseleave", function () {
        this.fill = (this.mouseDown) ? MapValues.objectMouseDownColor : shape.backupFill;
        fdm.canvas.redraw();
        this.mouseOver = false;
    }).bind("mousedown", function () {
        this.fill = MapValues.objectMouseDownColor;
        this.mouseDown = true;
        fdm.canvas.redraw();
    }).bind("mouseup", function () {
        this.fill = (this.mouseOver) ? MapValues.objectHoverColor : shape.backupFill;
        this.mouseDown = false;
        fdm.canvas.redraw();
    });
}

function makeShape(container) {
    var shape = container.object;
    shape.add();
    hoverClickColor(container);
    shape.moveWithTo = function (x, y) {
        shape.moveTo(x, y);
        _.each(container.children, function (c) {
            c.moveTo(shape._.x - shape.lastX, shape._.y - shape.lastY);
        });
        shape.lastX = shape._.x;
        shape.lastY = shape._.y;
    };

    shape.dragAndDrop({
        bubble: true,
        changeZindex: false,
        move: function () {
            _.each(container.children, function (c) {
                c.move(shape._.x - shape.lastX, shape._.y - shape.lastY);
            });

            _.each(container.linesFrom, function (line) {
                line.start.x = shape._.x;
                line.start.y = shape._.y;
            });
            _.each(container.linesTo, function (line) {
                line.end.x = shape._.x;
                line.end.y = shape._.y;
            });

            shape.lastX = shape._.x;
            shape.lastY = shape._.y;
        }
    });
    shape.lastX = shape._.x;
    shape.lastY = shape._.y;
}


