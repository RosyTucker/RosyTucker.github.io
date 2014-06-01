var numBoids = 50;
var timestep = 20;
var boidSize = window.outerWidth* 0.01;

var repulsion = 15 +  boidSize;
var alignment = 30 +  boidSize;
var attraction = 45 + boidSize;
var canvas;
var ctx;
var boids = [];

$(function animate(){
    setup();
    $(window).on("resize", resizeCanvas());
    setInterval(update, timestep);

})

function resizeCanvas(){
    console.log("Resizing");
    canvas.width =window.outerWidth;
    canvas.height =window.outerHeight*0.7;
    canvas.minHeight=window.outerHeight*0.5;
    canvas.minWidth =window.outerWidth;
    boidSize = window.outerWidth* 0.01;
}


function setup() {
    canvas = $('canvas').get(0);
    resizeCanvas()
    if(canvas){
        ctx = canvas.getContext("2d");
        for (var i = 0; i < numBoids; i++) {
            var initialVelocity =new Vector((-0.5 + (Math.random()*2)),
                (-1 + (Math.random()*2)));
            var initialPosition =new Vector(Math.random()* canvas.width,
                Math.random() * canvas.height);
            boids[i] = new Boid(initialPosition, initialVelocity);
        }
    }
}


function update() {
    for (var i = 0; i < boids.length; i++) {
        updateBoid(boids[i]);
    }
    render();
}


function render(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle="#FFFFFF";
    for (var i = 0; i < boids.length; i++) {
        ctx.strokeRect(boids[i].position.x - (boidSize*0.5), boids[i].position.y - (boidSize*0.5), boidSize, boidSize);
    }
}


function updateBoid(boid){

    //Sum vectors of all neighbour positions
    var attractionTotal = new Vector(0,0);
    var alignmentTotal = new Vector(0,0);
    var repulsionTotal = new Vector(0,0);

    //Neighbour Counts
    var repulsionNeighbours = 0;
    var alignmentNeighbours = 0;
    var attractionNeighbours = 0;

    for (var i = 0; i < boids.length; i++) {
        if(boids[i] != boid){
            if(boid.inRange(boids[i], repulsion)){
                var diff = new Vector(0,0);
                diff.x = boids[i].position.x - boid.position.x;
                diff.y = boids[i].position.y - boid.position.y;
                diff.normal();
                repulsionTotal.sub(diff);
                repulsionNeighbours++;
            }else if(boid.inRange(boids[i], alignment)){
                alignmentTotal.x += boids[i].velocity.x;
                alignmentTotal.y += boids[i].velocity.y;
                alignmentNeighbours++;
            }else if(boid.inRange(boids[i], attraction)){
                var diff = new Vector(0,0);
                diff.x = boids[i].position.x - boid.position.x;
                diff.y = boids[i].position.y - boid.position.y;
                diff.normal();
                attractionTotal.x += diff.x;
                attractionTotal.y += diff.y;
                attractionNeighbours++;
            }
        }
    }
    var total = new Vector(0,0);
    total.add(calculateRepulsion(repulsionTotal,repulsionNeighbours));
    total.add(calculateAlignment(alignmentTotal,alignmentNeighbours));
    total.add(calculateAttraction(attractionTotal,alignmentNeighbours));
    boid.updatePosition(total);
    processEdges(boid);
}


function calculateRepulsion(repulsionTotal, repulsionNeighbours){
    if(repulsionNeighbours > 0){
        repulsionTotal.x = repulsionTotal.x / repulsionNeighbours;
        repulsionTotal.y = repulsionTotal.y / repulsionNeighbours;
        return repulsionTotal.normal();
    }
    return new Vector(0,0);
}


function calculateAlignment(alignmentTotal, alignmentNeighbours) {
    if(alignmentNeighbours > 0){
        alignmentTotal.x = alignmentTotal.x / alignmentNeighbours;
        alignmentTotal.y = alignmentTotal.y / alignmentNeighbours;
        return alignmentTotal.normal();
    }
    return new Vector(0,0);
}


function calculateAttraction(attractionTotal, attractionNeighbours) {
    if (attractionNeighbours > 0) {
        attractionTotal.x = attractionTotal.x / attractionNeighbours;
        attractionTotal.y = attractionTotal.y / attractionNeighbours;
        return attractionTotal.normal();
    }
    return new Vector(0,0);
}


function processEdges(boid){
    if(boid.position.x > canvas.width){
        boid.position.x = 0 + boid.position.x - canvas.width;
    }else if(boid.position.x < 0){
        boid.position.x = canvas.width + boid.position.x;
    }

    if(boid.position.y > canvas.height){
        boid.position.y = 0 + boid.position.y - canvas.height;
    }else if(boid.position.y < 0){
        boid.position.y = canvas.height + boid.position.y;
    }
}


/********************************************
 Boid Class
 ********************************************/

function Boid(position, velocity){
    this.position = position;
    this.velocity = velocity;
}


Boid.prototype.inRange = function(neighbour, distance){
    //Defense
    if(!neighbour instanceof  Boid)
        throw new Error("Neighbour was not a boid");

    if(Vector.euclid(neighbour.position, this.position) <= distance){
        return true;
    }else{
        return false;
    }
}

Boid.prototype.updatePosition = function (total) {
    //Defense
    if(!total instanceof  Vector)
        throw new Error("Total was not a Vector");

    this.velocity.add(total);
    this.velocity.normal();
    var noise = (-1 + (Math.random()*2));
    this.position.x += this.velocity.x + noise;
    this.position.y += this.velocity.y+ noise;
}

