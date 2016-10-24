//October 10, 2016
//Software Development 2 GGC
//Chemistry Game

// This is where all the bullets go


var arrows = [];


var speedMod = 4;

var addArrow = function() {

  arrows.unshift(new Arrow());
  currArrow = arrows[0];
}


function Arrow() {

  this.x = shootingCirc.x;
  this.y = shootingCirc.y;
  this.arrowTipCoords = {
    x: this.x + 20,
    y: this.y

  };



  this.leftTipCoords = {

    x: this.x + 17,
    y: this.y - 3

  }


  this.rightTipCoords = {

    x: this.x + 17,
    y: this.y + 3

  }


  this.velX = 0;
  this.velY = 0;
  this.speed = 0;
  this.firing = false;
}


Arrow.prototype.fireArrow = function() {

  if (mousePos && !this.firing) {
    this.speed = Math.min(shootingCirc.r,
                 distBetween(shootingCirc, mousePos)) / speedMod;
    this.velX = Math.cos(angleBetween(mousePos, shootingCirc))* this.speed;
    this.velY = Math.sin(angleBetween(mousePos, shootingCirc))* this.speed;
    this.firing = true;
    addArrow();
  }
}


Arrow.prototype.calcTrajectory = function() {

  if (this.y <= groundPoint && this.firing) {
    this.velY += gravity;
    this.x += this.velX;
    this.y += this.velY;
  } else {
    this.velX = 0;
    this.velY = 0;
    this.firing = false;
  }

  };


Arrow.prototype.calcArrowHead = function() {

 if (this.firing) {
    var angle = Math.atan2(this.velX, this.velY);
  } else if (mousePos && this == currArrow) {
    var angle = Math.PI/2 - angleBetween(mousePos, shootingCirc);
  } else return;

  this.arrowTipCoords.x = this.x + 20 * Math.sin(angle);
  this.arrowTipCoords.y = this.y + 20 * Math.cos(angle);
  var arrowTip = {x:this.arrowTipCoords.x, y:this.arrowTipCoords.y}

  this.leftTipCoords.x = arrowTip.x - 3 * Math.sin(angle - Math.PI/4);
  this.leftTipCoords.y = arrowTip.y - 3 * Math.cos(angle - Math.PI/4);
  this.rightTipCoords.x = arrowTip.x - 3 * Math.sin(angle + Math.PI/4);
  this.rightTipCoords.y = arrowTip.y - 3 * Math.cos(angle + Math.PI/4);

  };

//The draw arrow function is what draws the projectiles on the screen

Arrow.prototype.drawArrow = function() {

  this.calcTrajectory();
  this.calcArrowHead();
  var arrowTip = this.arrowTipCoords;
  var leftTip = this.leftTipCoords;
  var rightTip = this.rightTipCoords;

  ctx.beginPath();
  ctx.moveTo(this.x, this.y);
  ctx.lineTo(arrowTip.x, arrowTip.y);

  ctx.moveTo(arrowTip.x, arrowTip.y);
  ctx.lineTo(leftTip.x, leftTip.y);

  ctx.moveTo(arrowTip.x, arrowTip.y);
  ctx.lineTo(rightTip.x, rightTip.y);

  ctx.strokeStyle = "black";
  ctx.stroke();

  };
