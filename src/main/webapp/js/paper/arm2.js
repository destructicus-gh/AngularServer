rootPoint = new Point(400, 400);
//root
rootCircle = Path.Circle({
    center:rootPoint.clone(), 
    radius:20,
    strokeColor :"black", 
    fillColor: new Color(.5, .5, .5),
    name:'root_circle'
});
g_circle = new Group([rootCircle]);

//humerus
arm1 = new Path.Rectangle({
    point:rootPoint.clone()-new Point(20, 0),
    size: new Size(40, -100),
    strokeColor: 'black',
    name:"humerus"
});
g_arm1 = new Group([arm1]);
g_circle.addChild(g_arm1);

//radius/ulna
arm2 = new Path.Rectangle({
    point:rootPoint.clone()-new Point(20, 100),
    size: new Size(40, -100),
    strokeColor: 'black',
    name:"radius"
});
g_arm2 = new Group([arm2]);
g_arm1.addChild(g_arm2);


//hand
hand = Path.Rectangle({
    point:rootPoint.clone()-new Point(30, 200), 
    size: new Size(60, -60 ), 
    strokeColor :"black", 
    name:"hand"
});
g_hand = new Group([hand]);
g_arm2.addChild(g_hand);


//dot to collect
dot = Path.Circle(new Point(0,0), 10);
old_dot = dot.position;

//flag for collection;
collect = false;  

vector = (arm1.position-rootCircle.position);
vector.length = 100;
//elbow
elbow = Path.Circle({
    center:vector+rootPoint, 
    radius:10,
    strokeColor :"black", 
    fillColor: new Color(.5, 1, 0),
});


distance = 0;
max_distance = 230;
goal_angle = 0;

old_angle = 0;

function getElbowPosition(){
    var vect = (arm1.position-rootCircle.position);
    vect.length = 100;
    return vect+rootPoint;
}
function findAngles(indistance){
    if (indistance > max_distance) return [0,0,0];
    if (indistance < 40) return [0,0,0];
    var sideA = indistance;
    var sideB = 100;
    var sideC = 130;
    var acosarg = ((sideB*sideB)+(sideC*sideC)-(sideA*sideA))/(2*sideB*sideC);
    var angleA = Math.acos(acosarg);

    var bcosarg = ((sideA*sideA)+(sideC*sideC)-(sideB*sideB))/(2*sideA*sideC);
    var angleB = Math.acos(bcosarg);
    
    var ccosarg = ((sideA*sideA)+(sideB*sideB)-(sideC*sideC))/(2*sideA*sideB);
    var angleC = Math.acos(ccosarg);
    
    var dm = (180/Math.PI);
    return [angleA*dm,angleB*dm,angleC*dm];
}
function calculate(toPoint){
    var distance_vector = toPoint - rootPoint;
    distance = distance_vector.length;
    goal_angle = distance_vector.angle;
    var angle_difference = (arm1.position - rootPoint).angle - distance_vector.angle
    return (-1*angle_difference);
}

dot.fillColor = new Color(Math.random(),Math.random(),Math.random());
function goTo(point) {
    
    dot.position = point;
    collect = true;
    var angleToChange = calculate();
    var angles = findAngles(distance);
    g_circle.rotate(angleToChange+angles[2], rootPoint);
    elbow.position = getElbowPosition(); 
    var rot2 = (-(angles[2]+angles[1]))+ (-1*old_angle);
    old_angle = (-(angles[2]+angles[1]));
    g_arm2.rotate(rot2, elbow.position);
}
function goToPoint(point, percent){
    dot.position = point;
    var newVector = point - old_dot;
    newVector.length = newVector.length*percent;
    //console.log(newVector.length);
    point = newVector+old_dot;
    /*
    var tempOne = Path.Circle({
       center:point, radius: 10, strokeColor:'blue' 
    });
    
    */
    collect = true;
    var angleToChange = calculate(point);
    var angles = findAngles(distance);
    g_circle.rotate((angleToChange+angles[2]), rootPoint);
    elbow.position = getElbowPosition(); 
    var rot2  = (-(angles[2]+angles[1]))+ (-1*old_angle);
    old_angle = (-(angles[2]+angles[1]));
    g_arm2.rotate(rot2, elbow.position);
    old_dot = point;
}

function onMouseUp(event){
    old_dot = dot.position.clone();
    dot.position = event.point.clone();
   

    
}

function onFrame(event){ 
    goToPoint(dot.position, event.delta);
    //console.log();
    //goToPoint(dot.position, event.delta);
    if (collect){
        //dot.fillColor.hue+=.75;
    }
}