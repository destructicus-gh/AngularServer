whole = new Group();
body = new Group();
arm = new Group();
var bodyPath = new Path.Circle(new Point (200, 200), 40);
bodyPath.strokeColor = "black";
body.addChild(bodyPath);
var armPath = new Path.Circle(new Point(180, 180), 20);
armPath.strokeColor = "green";
var armPath2 = new Path.Circle(new Point (170, 160), 10);
armPath2.strokeColor = "blue";
arm.addChild(armPath);
arm.addChild(armPath2);
body.addChild(arm);
whole.addChild(body);

function onFrame(event){
    //arm.rotate(7, armPath.position);

}