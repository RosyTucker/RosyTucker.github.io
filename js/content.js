var numBoids = 100;
var timestep = 20;

var repulsion = 100;
var alignment = 200;
var attraction = 300;
var initialSpeed = 5;
var canvas;
var ctx;
var boids = [];

$(function animate(){
    setup();
    setInterval(update, timestep);
});


function resizeCanvas(){
    canvas.width =window.outerWidth;
    canvas.height =window.outerHeight*0.7;
    canvas.minHeight=window.outerHeight*0.5;
    canvas.minWidth =window.outerWidth;
}

function setup() {
    canvas = $('canvas').get(0);
    resizeCanvas()
    if(canvas){
        ctx = canvas.getContext("2d");
        for (var i = 0; i < numBoids; i++) {
            var velocityVector =new Vector((-1 + (Math.random()*2))* initialSpeed,
                (-1 + (Math.random()*2))* initialSpeed);
            boids[i] = new Boid(Math.random()* canvas.width,
                Math.random() * canvas.height, velocityVector);
        }
    }
};

function update() {
    for (var i = 0; i < boids.length; i++) {
        updateBoid(boids[i]);
    }
    render();
}


function render(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle="#FFFFFF";
    var boidSize = window.outerWidth* 0.02;
    for (var i = 0; i < boids.length; i++) {
        ctx.strokeRect(boids[i].position.x+0.5, boids[i].position.y+0.5, boidSize, boidSize);
    }
}

function updateBoid(boid){
    var neighbours = 0;
    var alignNeighbours = 0;
    var sumPosition = new Point(0,0);
    var sumVelocity = new Vector(0,0);

    console.log("Velocity: " + boid.velocityVector[0] + "," + boid.velocityVector[1]);

    for (var i = 0; i < boids.length; i++) {
        if(boids[i] != boid){
            if(inRange(boids[i], boid, repulsion)){
                repulse(boid, boids[i], sumPosition);
                neighbours++;
            }else if(inRange(boids[i], boid, alignment)){
                align(boid, sumVelocity);
                alignNeighbours++
            }else if(inRange(boids[i], boid, attraction)){
                attract(boid, boids[i], sumPosition);
                neighbours++;
            }
        }
    }
    if(neighbours > 0){
        sumPosition.x = sumPosition.x/neighbours;
        sumPosition.y = sumPosition.y/neighbours;
    }

    boid.velocityVector.dx += -0.5 + Math.random();
    boid.velocityVector.dy += -0.5 + Math.random();

    boid.position.x += boid.velocityVector.dx;
    boid.position.y += boid.velocityVector.dy;
}

function repulse(boid, neighbour, sumVector){
    var diff = new Point(0,0)
    diff.x = neighbour.position.x - boid.position.x;
    diff.y = neighbour.position.y - boid.position.y;
    diff = normalizePosition(diff);
    sumVector.x -= diff.x * (1/euclid(neighbour.x, boid.x, neighbour.y, boid.y));
    sumVector.y -= diff.y * (1/euclid(neighbour.x, boid.x, neighbour.y, boid.y));
}

function align(neighbour, sumVelocity){
    sumVelocity.dx += neighbour.velocityVector.x;
    sumVelocity.dx += neighbour.velocityVector.y;
}

function attract(boid, neighbour, sumVector){
    var diff = new Point(0,0)
    diff.x = neighbour.position.x - boid.position.x;
    diff.y = neighbour.position.y - boid.position.y;
    diff = normalizePosition(diff);
    sumVector.x += diff.x * (1/euclid(neighbour.x, boid.x, neighbour.y, boid.y));
    sumVector.y += diff.y * (1/euclid(neighbour.x, boid.x, neighbour.y, boid.y));
}

function inRange(neighbour, boid, distance){
    if(euclid(neighbour.x, boid.x, neighbour.y, boid.y) <= distance){
        return true;
    }else{
        return false;
    }
}

function Boid(x, y, velocity){
    this.position = new Point(x,y);
    this.velocityVector = velocity;
}

function Point(x,y){
    this.x = x;
    this.y =y;
}

function Vector(dx,dy){
    this.dx = dx;
    this.dy =dy;
}

function normalizePosition(position) {
    var newPosition = new Vector(0,0);
    var length = Math.sqrt( Math.pow(position.x,2) + Math.pow(position.y,2) );
    if (length != 0) {
        newPosition.x = position.x/length;
        newPosition.y = position.y/length;
    }
    return newPosition;
}

function euclid(x1,x2,y1,y2){
    var euclid = Math.pow(x1 - x2, 2);
    euclid += Math.pow(y1- y2, 2);
    return Math.sqrt(euclid);
}