function rotateAround(pointA, pointB, degrees){
    var pointC = pointB - pointA;
    pointC.angle+= degrees;
    return pointC+pointA;
}


function MPath(offset){
    this._lastPoint=new Point(0,0),
    this._offset=offset.clone(),
    this.path= new Path(),
    this.addPointRelative= function(a, b){
        point = new Point(a, b)
        this.path.add(point + this._lastPoint + this._offset);
        this._lastPoint = point + this._lastPoint
    },
    this.getPoint=function(index){
        return this.path.segments[index].point;
    }
    this.setPoint=function(index, point){
        return this.path.segments[index].point = point;
    }
}


var points= 
[
    [0,0], [0, -100], [-10,0],
    [0,10], [10,0]
];
mpo = new MPath(new Point(100, 100));
mpo.path.strokeColor="green";
for (i = 0; i< points.length; i++){
    mpo.addPointRelative(points[i][0], points[i][1]);
}
var sh = new Shape.Circle(new Point(100,100), 10);
sh.strokeColor = "black";


orbitable = new Shape.Circle(new Point(200,200), 20);
orbitable.strokeColor = new Color(0,0,.5);
orbitable.fillColor = "blue";

orbiter = new Shape.Circle(new Point(300,200), 10);
orbiter.strokeColor = new Color(.5,0,0);
orbiter.fillColor = "red";

orbiter2 = new Shape.Circle(new Point(400,200), 10);
orbiter2.strokeColor = new Color(.5,0,0);
orbiter2.fillColor = "red";

function onFrame(event){
    var oldpoint = orbiter.position
    orbiter.position = rotateAround(orbitable.position, orbiter.position, 360*event.delta)
    
    orbiter2.position += orbiter.position-oldpoint;
    orbiter2.position = rotateAround(orbiter.position, orbiter2.position, 720*event.delta)
    
    for (i = 1; i<5; i++){
        var newPoint = rotateAround( mpo.getPoint(0),mpo.getPoint(i), 45*event.delta);
        mpo.setPoint(i, newPoint);
    }
    
    
}


function onMouseDown(event){

}




/*
var sourcePoint = new Point(100, 400);
var rotatePoint = new Point(200, 300);
for (i = 0; i< 36; i++){
    var s = new Shape.Circle(rotateAround(sourcePoint, rotatePoint, i*10), 10);
    s.strokeColor = 'blue'
}

var sourceCircle = new Shape.Circle(sourcePoint, 10)
sourceCircle.strokeColor = 'green';

var rotateCircle = new Shape.Circle(rotatePoint, 10)
rotateCircle.strokeColor = 'yellow';


function addRelative(a, b){
    point = new Point(a, b)
    //myPath.add(point+lastPoint+offset);
    lastPoint = point+lastPoint
}
function rotateAround(pointA, pointB, degrees){
    var pointC = pointB - pointA;
    pointC.angle+= degrees;
    return pointC+pointA;
}

*/

//create a heirarchy model
//figure out methods
