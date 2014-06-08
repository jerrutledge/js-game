console.log("Game.js got run!");

var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');

document.body.appendChild(canvas);
console.log("CTX is defined!");
canvas.width = 640;
canvas.height = 480;

// Character
var x = 320;
var y = 100; 
var dir = 0; 
var chSprite; 
var inAir = true; 
var vspeed = 0; 
// Keybaord input
var right = false; 
var left = false; 
var up = false; 
// Image loading & Animation
var framin = 0; 
var frame = 0; 
var loading = 0; 
// Walls
var walls = new Array(); 
function Wall(x,y,width,height) {
	this.x = x; 
	this.y = y; 
	this.width = width; 
	this.height = height; 
	walls.push(this); 
}

Wall.prototype.draw = function() {
	ctx.fillStyle="#000099";
	ctx.fillRect(this.x,this.y,this.width,this.height);
};

var Room = function() {
	new Wall(0,0,canvas.width, 16);
	new Wall()
	new Wall(0,0,16,360);
	new Wall(0, 360, canvas.width, 16); 
	new Wall(240, 224, canvas.width-240, 16);
	new Wall(32,300,64,16);
	new Wall(canvas.width-16, 0, 16, 360);
	new Wall(480,176,64,16);
	new Wall(160, 256, 64, 16);
}

Room(); 


// IMAGE LOADING STUFF
var imageOnLoad = function() {
	console.log("Image loaded"); 
}; 

var walkright = new Array(
	"Lola right/Lola 1.png",
	"Lola right/Lola 2.png",
	"Lola right/Lola 1.png",
	"Lola right/Lola 4.png"
); 
var walkleft = new Array(
	"Lola left/Lola 1.png",
	"Lola left/Lola 2.png",
	"Lola left/Lola 1.png",
	"Lola left/Lola 4.png"
); 

var rightw = new Array(); 

for (var i=0; i < walkright.length; i++) {
	rightw.push(new Image());
	rightw[i].onload = imageOnLoad(); 
	rightw[i].src = walkright[i]; 
}

var leftw = new Array(); 

for (var i=0; i < walkleft.length; i++) {
	leftw.push(new Image());
	leftw[i].onload = imageOnLoad(); 
	leftw[i].src = walkleft[i]; 
}

ctx.drawImage(rightw[0], x, y); 

// KEYBOARD INPUT
document.body.onkeydown = function() {
	//console.log("WOAH"+event.keyCode); 
	if (event.keyCode == 39) {
		right = true;
	} 
	if (event.keyCode == 38) {
		up = true;
	} 
	if (event.keyCode == 37) {
		left = true;
	} 
}; 
document.body.onkeyup = function() {
	if (event.keyCode == 39) {
		right = false;
	} 
	if (event.keyCode == 38) {
		up = false;
	} 
	if (event.keyCode == 37) {
		left = false;
	} 
}; 

// FRAMES!!

var CheckCol = function(x,y,width,height) {
	for (var m = walls.length - 1; m >= 0; m-=1) {
		if ( ((walls[m].x <= x && walls[m].x+walls[m].width >= x) || (walls[m].x >= x && walls[m].x <= x+width))   &&   ((walls[m].y <= y && walls[m].y+walls[m].height >= y) || (walls[m].y >= y && walls[m].y <= y+height)) ) {
			return walls[m]; 
		}
	}
	return false;
}

setInterval("animate();", 30);

var animate = function() { 
	// INPUT & MOVEMENT
	if (up && !inAir) {
		y-=5; 
		vspeed = -11; 
		inAir = true; 
		console.log("Tried to jump");
	}

	

	if (inAir) {
		y+=vspeed; 
		vspeed += 1; 
		var cc = CheckCol(x-4,y-32+vspeed,8, 32); 
		if (cc != false) {
			if (y < cc.y+cc.height) {
				y = cc.y; 
				inAir = false; 
			}
			else {
				y = cc.y+cc.height+32; 
			}
			vspeed = 0; 
		}
	}
	else {
		var cc = CheckCol(x-4,y-31,8, 32); 
		if (cc == false) {
			inAir = true; 
		}
	}

	if (left && !right && CheckCol(x-8,y-31,8, 30) == false) {
		x-=4; 
		dir = 1; 
	}
	else if (right && !left && CheckCol(x,y-31,8, 30) == false) {
		x+=4; 
		dir = 0; 
	}

	// SPRITES & FRAMES
	if (!inAir) {
		if (!left && !right) {
			frame = 0;
			framin = 3; 
		}
		else {
			framin += 1; 
			if (framin >=3) {
				frame = (frame+1) % walkright.length; 
				framin = 0;
			}
		}
	}
	else {
		frame = 1; 
		framin = 3; 
	}

	if (dir) {
		chSprite = leftw; 
	}
	else {
		chSprite = rightw; 
	}

	ctx.clearRect(0,0,canvas.width, canvas.height); 
	for (var i = walls.length - 1; i >= 0; i--) {
		walls[i].draw(); 
	};
	ctx.drawImage(chSprite[frame], x-16, y-32);
};