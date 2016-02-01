function rotateAround(origin, orbiter, degrees){
    var pointC = orbiter - origin;
    pointC.angle+= degrees;
    return pointC+origin;
}


function MPath(offset){
    this.name = "default name";
    this._lastPoint=new Point(0,0);
    this._offset=offset.clone(); //root
    this.path= new Path();
    this.addPointRelative= function(a, b){
        point = new Point(a, b)
        this.path.add(point + this._lastPoint + this._offset);
        this._lastPoint = point + this._lastPoint
    };
    this.getPoint=function(index){
        return this.path.segments[index].point;
    };
    this.setPoint=function(index, point){
        this.path.segments[index].point = point;
    };
    this.rotateAllAround = function(origin, angle){
        for (i = 0;i <this.path.segments.length; i++){
            this.path.segments[i].point = 
                rotateAround(origin, this.path.segments[i].point, angle);
        }
    };
    this.rotateAllTo = function(origin, angle){
        for (i = 0;i <this.path.segments.length; i++){
            this.path.segments[i].point.angle = angle;
        }
    };
    
    
}
function Heirarchy(mpath, heirarchyArray, offset){
    return {path: mpath, children:heirarchyArray, anchor:offset}
}
function MasterPather(offset){
    this._root = offset.clone();
    this.heirarchy = {path: new MPath(new Point(0,0)), children:[]};
    
    this.addPath = function(heirarchy, placement){
        var place = this.heirarchy;
        for (i = 0; i< placement.length; i++){
            
            place = place.children[placement[i]];
        }
        place.children.push(heirarchy);
    };
    
    this.rotateChild = function(placement, angle){
        var place = this.heirarchy;
        var root = this.heirarchy.path;
        for (i = 0; i< placement.length; i++){
            root = place;
            place = place.children[placement[i]];
        }
        console.log(place, root);
        place.path.rotateAllAround(root.path._offset+place.anchor, angle);
    }
    
}
objec = new MasterPather(new Point(200,400));
var basePath = new MPath(new Point(200, 200));
basePath.name = "basePath";
var basePoints= 
[
    [-20, 0], [5, -20], [10, -20], [10, 0],
    [10, 20], [5, 20], [-10, 20], [-10, 60], [-10, -60]
    
    
];
for (i = 0; i< basePoints.length; i++){
    basePath.addPointRelative(basePoints[i][0], basePoints[i][1]);
}
basePath.path.closed = true;
basePath.path.strokeColor = "red";
basePath.path.flatten(10);
basePath.path.smooth();
//basePath.path.simplify();

var h = new Heirarchy(basePath, [], new Point(0, 0));
objec.addPath(h, []);
//console.log(objec);

var points= 
[
    [0,0], [0, -100], [-10,0],
    [0,10], [10,0]
];
var subPath = new MPath(new Point(200, 200));
subPath.name = "subPath";
subPath.path.strokeColor="blue";
for (i = 0; i< points.length; i++){
    subPath.addPointRelative(points[i][0], points[i][1]);
}

h = new Heirarchy(subPath, [], new Point(0,-10));
objec.addPath(h, [0]);
console.log(objec);

objec.rotateChild([0, 0], 40);


mpo = new MPath(new Point(100, 100));
mpo.path.strokeColor="green";
for (i = 0; i< points.length; i++){
    mpo.addPointRelative(points[i][0], points[i][1]);
}




function Timer(time, steps){
    this.time = time;
    this._internalTime = 0;
    this.steps = steps;
    this.evaluate=function(deltaTime){
        var index = 0;
        var oldTime = 0;
        while (deltaTime > oldTime){
            index++;
            oldTime = this.steps[index][0];
        
        }
        var prev = this.steps[0]
        var thisOne = this.steps[index]
        if (index > 0){
            prev = this.steps[index-1]
        }
        q1 = thisOne[0]-prev[0];
        q2 =(thisOne[1]-prev[1]);
        var result = (q2*((deltaTime-prev[0])/(q1)))+prev[1];
        if (isNaN(result)){
            result = steps[index][1];
        }
        return result;
     
        
        
    };
}

var steps = [
    [0, -60], 
    [.25, 0],
    [.5, 60],
    [.75, 0],
    [1, -60]
    ]
var steps2 = [
    [0, 0], 
    [.5, -60],
    [1, 0],
    [1.5,60],
    [2, 0]
    ]

timmer = new Timer(2, steps2);
sumDeltaTime = 0;
function onFrame3(event){
    var dtf = timmer.evaluate(sumDeltaTime);
    mpo.rotateAllAround(new Point(100, 100), -dtf);
    sumDeltaTime+=event.delta;
    if (sumDeltaTime > timmer.time){
        sumDeltaTime-=timmer.time;
    }
    dtf = timmer.evaluate(sumDeltaTime);
    mpo.rotateAllAround(new Point(100, 100), dtf);

}

function onMouseDown(event){
  objec.rotateChild([0, 0], 40);
}

/*

function addRelative(a, b){
    point = new Point(a, b)
    lastPoint = point+lastPoint
}


*/

//create a heirarchy model
//figure out methods
