rootPoint = new Point(400, 400);
//root
rootCircle = Shape.Circle({
    center:rootPoint.clone(), 
    radius:20,
    strokeColor :"black", 
    fillColor: new Color(.5, .5, .5),
    name:'root_circle'
});
//humerus
arm1 = new Shape.Rectangle({
    point:rootPoint.clone()-new Point(20, 0),
    size: new Size(40, -100),
    strokeColor: 'black',
    name:"humerus"
});

//radius/ulna
arm2 = Shape.Rectangle(rootPoint.clone()-new Point(20, 100), new Size(40, -100))
arm2.strokeColor = "black";

//hand
hand = Shape.Rectangle(rootPoint.clone()-new Point(30, 200), new Size(60, -60 ))
hand.strokeColor = "black";

//dot to collect
dot = Shape.Circle(new Point(0,0), 10);

//flag for collection;
collect = false;  

function onMouseUp(event) {
    dot.position = event.point;
    dot.fillColor = new Color(Math.random(),Math.random(),Math.random());
}

function onFrame(event){
    if (collect){
        
    }
}