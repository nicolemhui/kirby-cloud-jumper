class Player {
  constructor(game) {
    this.game = game;
    this.x = (game.width / 2) - 50;
    this.y = 100;
    this.w = 50;
    this.h = 50;
    this.direction = "right";

    this.jumpSpeed = 0;
    this.fallingSpeed = 0;

    this.isJumping = false;
    this.descending = true;
  }

  draw() {
    const canvasEl = document.getElementById("canvas");
    let ctx = canvasEl.getContext("2d");
    
    const kirbyright = new Image();
    kirbyright.src = '../cloud-jumper/src/images/kirby_right.png';
    
    const kirbyleft = new Image();
    kirbyleft.src = '../cloud-jumper/src/images/kirby_left.png';
    
    if (this.direction === "left") {
      ctx.drawImage(kirbyleft, this.x, this.y, 50, 50);
    } else if (this.direction === "right") {
      ctx.drawImage(kirbyright, this.x, this.y, 50, 50);
    }
  }

  move() {
    this.falling();

    this.fallingSpeed += 0.1;
    this.y += this.fallingSpeed + this.jumpSpeed;

    this.checkBoundaries();
  }
  
  checkBoundaries() {
    if (this.x + this.w >= this.game.width) {
      this.x = 0;
    } else if (this.x + this.w <= 0) {
      this.x = 440;
    } else if (this.y + this.h <= 0) {
      this.y = 500;
    }
  }

  jump(speed) {
    if (!this.isJumping && this.descending) {
      this.fallingSpeed = 0;
      this.jumpSpeed -= speed;
    }
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }
  
  falling() {
    this.jumpSpeed += 0.05;
    if (this.jumpSpeed <= 0) {
      this.descending = true;
      this.isJumping = false;
    }  
  }

  moveDirection(direction) {
    switch(direction) {
      case "down":
        this.y += 5;
        break;
      case "left":
        this.direction = "left";
        this.x -= 7;
        break;
        case "right":
        this.direction = "right";
        this.x += 7;
        break;
    }
  }

}

export default Player;



