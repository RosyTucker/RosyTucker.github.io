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
}

Vector.prototype.normal = function() {
    var length = Math.sqrt( Math.pow(this.x,2) + Math.pow(this.y,2) );
    if (length != 0) {
        this.x = this.x/length;
        this.y = this.y/length;
    }
    return this;
}

Vector.prototype.add = function(vector){
    this.x += vector.x;
    this.y += vector.y;
}

Vector.prototype.sub = function(vector){
    this.x -= vector.x;
    this.y -= vector.y;
}

Vector.prototype.mult = function(vector){
    this.x *= vector.x;
    this.y *= vector.y;
}

Vector.prototype.div = function(vector){
    this.x /= vector.x;
    this.y /= vector.y;
}