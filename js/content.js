var numBoids = 500;
var timestep = 100;
var boidSize = window.outerWidth* 0.0005;

var repulsion = 7* boidSize;
var alignment = 16 * boidSize;
var attraction = 80 * boidSize;
var canvas;
var ctx;
var boids = [];

$(function animate(){
    setup();
    setInterval(update, timestep);
    update();
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
            var initialVelocity =new Point((-0.5 + (Math.random()*2)),
                (-1 + (Math.random()*2)));
            var initialPosition =new Point(Math.random()* canvas.width,
                Math.random() * canvas.height);
            boids[i] = new Boid(initialPosition, initialVelocity);
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
    for (var i = 0; i < boids.length; i++) {
        ctx.strokeRect(boids[i].position.x+0.5, boids[i].position.y+0.5, boidSize, boidSize);
    }
}

function updateBoid(boid){
    var attractionTotal = new Point(0,0);
    var orientationTotal = new Point(0,0);
    var repulsionTotal = new Point(0,0);

    var repulsionNeighbours = 0;
    var orientationNeighbours = 0;
    var attractionNeighbours = 0;

    for (var i = 0; i < boids.length; i++) {
        if(boids[i] != boid){
            if(boid.inRange(boids[i], repulsion)){
                var diff = new Point(0,0);
                diff.x = boids[i].position.x - boid.position.x;
                diff.y = boids[i].position.y - boid.position.y;
                diff = Point.normalize(diff);
                repulsionTotal.x -= diff.x;
                repulsionTotal.y -= diff.y;
                repulsionNeighbours++;
            }else if(boid.inRange(boids[i], alignment)){
                orientationTotal.x += boids[i].velocity.x;
                orientationTotal.y += boids[i].velocity.y;
                orientationNeighbours++;
            }else if(boid.inRange(boids[i], attraction)){
                var diff = new Point(0,0);
                diff.x = boids[i].position.x - boid.position.x;
                diff.y = boids[i].position.y - boid.position.y;
                diff = Point.normalize(diff);
                attractionTotal.x += diff.x;
                attractionTotal.y += diff.y;
                attractionNeighbours++;
            }
        }
    }



    if(repulsionNeighbours > 0){
        repulsionTotal.x = repulsionTotal.x / repulsionNeighbours;
        repulsionTotal.y = repulsionTotal.y / repulsionNeighbours;
        repulsionTotal = Point.normalize(repulsionTotal);
    }

    if(attractionNeighbours > 0){
        attractionTotal.x = attractionTotal.x / attractionNeighbours;
        attractionTotal.y = attractionTotal.y / attractionNeighbours;
        attractionTotal = Point.normalize(attractionTotal);
    }

   if(orientationNeighbours > 0){
        orientationTotal.x = orientationTotal.x / orientationNeighbours;
        orientationTotal.y = orientationTotal.y / orientationNeighbours;
         orientationTotal = Point.normalize(orientationTotal);

   }

    boid.velocity.x += (attractionTotal.x + orientationTotal.x + repulsionTotal.x);
    boid.velocity.y += (attractionTotal.y + orientationTotal.y + repulsionTotal.y);
    boid.velocity = Point.normalize(boid.velocity);
    boid.position.x += boid.velocity.x;//* (1000/window.outerWidth);
    boid.position.y += boid.velocity.y;//* (1000/window.outerWidth);
}




/********************************************
 Boid Class
 ********************************************/

function Boid(position, velocity){
    this.position = position;
    this.velocity = velocity;
}


Boid.prototype.inRange = function(neighbour, distance){
    if(neighbour instanceof  Boid){
        if(Point.euclid(neighbour.position, this.position) <= distance){
            return true;
        }else{
            return false;
        }
    }else{
        console.error("Neighbour was not a boid");
    }
}

/********************************************
 Point Class
 ********************************************/
function Point(x,y){
    this.x = x;
    this.y =y;
}

Point.normalize = function(point) {
    var newPosition = new Point(0,0);
    var length = Math.sqrt( Math.pow(point.x,2) + Math.pow(point.y,2) );
    if (length != 0) {
        newPosition.x = point.x/length;
        newPosition.y = point.y/length;
    }
    return newPosition;
}

Point.euclid = function(point1,point2){
    if(point1 instanceof Point && point2 instanceof Point){
        var euclid = Math.pow(point1.x - point2.x, 2);
        euclid += Math.pow(point1.y- point2.y, 2);
        return Math.sqrt(euclid);
    }else{
        console.error("Non Point passed to Point.euclid");
    }
}