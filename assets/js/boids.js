var timestep = 20;

var numBoids;
var boidSize;
var repulsion;
var alignment;
var attraction;
var canvas;
var ctx;
var boids = [];

$(function animate(){
    canvas = $('canvas').get(0);
    $(window).on('resize', resize);
    resize();
    setInterval(update, timestep);
});

function resize(){
    var w = window.innerWidth;
    var h = window.innerHeight;

    if(w < 800){
        numBoids = 100;
        boidSize = 8;
    }else{
        numBoids = 250;
        boidSize = 12;
    }
    repulsion = boidSize *4.5;
    alignment = boidSize*6;
    attraction = boidSize*7.5;

    canvas.scaleX = 1;
    canvas.scaleY = 1;

    canvas.width = w * canvas.scaleX;
    canvas.height = h * canvas.scaleY;
    setup();
}


function setup() {
    boids = [];
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
    for (var i = 0; i < boids.length; i++) {
        ctx.fillStyle= boids[i].color;
        var rad =  Math.atan2(boids[i].position.x - (boidSize*0.5), boids[i].position.y - (boidSize*0.5));
        drawRectRotate(boids[i].position.x - (boidSize*0.5), boids[i].position.y - (boidSize*0.5), boidSize, boidSize, rad)
    }
}

function drawRectRotate(x,y,width,height, rad){
    ctx.translate(x + width / 2, y + height / 2);
    ctx.rotate(rad);
    ctx.fillRect(width / 2 * (-1),height / 2 * (-1),width,height);
    ctx.rotate(rad * ( -1 ) );
    ctx.translate((x + width / 2) * (-1), (y + height / 2) * (-1));
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
                alignmentTotal.add(boids[i].velocity);
                alignmentNeighbours++;
            }else if(boid.inRange(boids[i], attraction)){
                var diff = new Vector(0,0);
                diff.x = boids[i].position.x - boid.position.x;
                diff.y = boids[i].position.y - boid.position.y;
                diff.normal();
                attractionTotal.add(diff);
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
        repulsionTotal.div(repulsionNeighbours);
        return repulsionTotal.normal();
    }
    return new Vector(0,0);
}


function calculateAlignment(alignmentTotal, alignmentNeighbours) {
    if(alignmentNeighbours > 0){
        alignmentTotal.div(alignmentNeighbours);
        return alignmentTotal.normal();
    }
    return new Vector(0,0);
}


function calculateAttraction(attractionTotal, attractionNeighbours) {
    if (attractionNeighbours > 0) {
        attractionTotal.div(attractionNeighbours);
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
    this.color = getStrokeColour();
}

function getStrokeColour (){
    var num = Math.floor((Math.random() * 4) + 1);
    switch(num){
        case 1:
            return "#DED4B9";
        case 2:
            return "#46433A";
        case 3:
            return "#CE534D";
        default:
            return "#64B6B1";
    }
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
};

Boid.prototype.updatePosition = function (total) {
    //Defense
    if(!total instanceof  Vector)
        throw new Error("Total was not a Vector");
    this.velocity.add(total);
    this.velocity.normal();
    var noise = (-0.5 + Math.random());
    this.velocity.add(noise);
    this.position.add(this.velocity);
};

/********************************************
 Vector Class
 ********************************************/

function Vector(x,y){
    this.x = x;
    this.y =y;
}

Vector.euclid = function(vec1,vec2){
    //Defense
    if(!vec1 instanceof Vector || !vec2 instanceof Vector)
        throw new Error("Non Vector passed to Vector.euclid");

    var euclid = Math.pow(vec1.x - vec2.x, 2);
    euclid += Math.pow(vec1.y- vec2.y, 2);
    return Math.sqrt(euclid);
};

Vector.prototype.normal = function() {
    var length = Math.sqrt( Math.pow(this.x,2) + Math.pow(this.y,2) );
    if (length != 0) {
        this.x = this.x/length;
        this.y = this.y/length;
    }
    return this;
};

Vector.prototype.add = function(added){
    if(added instanceof Vector){
        this.x += added.x;
        this.y += added.y;
    } else{
        this.x += added;
        this.y += added;
    }
};

Vector.prototype.sub = function(subbed){
    if(subbed instanceof Vector){
        this.x -= subbed.x;
        this.y -= subbed.y;
    } else{
        this.x += subbed;
        this.y += subbed;
    }
};

Vector.prototype.mult = function(num){
    this.x *= num;
    this.y *= num;
};

Vector.prototype.div = function(num){
    this.x /= num;
    this.y /= num;
};
