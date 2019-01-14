const NORMAL_FRAME_TIME_DELTA = 1000 / 60;
import Cloud from './cloud';

class Player {
  constructor(game) {
    this.game = game;
    this.x = (game.width / 2) - 50;
    this.y = 100;
    this.w = 50;
    this.h = 50;

    this.jumpSpeed = 0;
    this.fallingSpeed = 0;

    //jumping
    this.isJumping = false;
    this.descending = true;
    this.currentHeight = 0;
    //height

    this.score = 0;
  }

  draw() {
    const canvasEl = document.getElementById("canvas");
    let ctx = canvasEl.getContext("2d");
    ctx.drawImage(kirby, this.x, this.y, 50, 50);
  }

  // move(timeDelta) {
  //   // this.falling();

  //   // const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
  //     // offsetY = this.jumpSpeed * velocityScale;

  //   this.fallingSpeed += 0.1;
  //   this.y += this.fallSpeed + this.jumpSpeed;
  //   // this.y = this.y + offsetY;

  //   // this.checkCollision();
  //   // this.checkScore();
  // }

  move(timeDelta) {
    //UNCOMMENT AFTER TESTING!!
    this.falling();

    this.fallingSpeed += 0.1;
    this.y += this.fallingSpeed + this.jumpSpeed;

    // const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
    //   offsetY = this.jumpSpeed * velocityScale;
    // this.y = this.y + offsetY;

    this.checkBoundaries();

    // this.game.checkCollision();
    // this.checkScore();
  }
  
  checkBoundaries() {
    if (this.x + this.w >= this.game.width) {
      //if player hits the right side of screen, then 1) reset their position to 0;
      this.x = 0;
    } else if (this.x + this.w <= 0) {
      this.x = 440;
    } else if (this.y + this.h <= 0) {
      this.y = 500;
    }
  }

  checkScore() {
    const topWall = this.game.walls[0];
    const bottomWall = this.game.walls[1];

    if (topWall.x && bottomWall.x == 10) {
      this.score += 1;
    }
  }

  jump(speed) {
    console.log("JUMPING", this.isJumping);
    console.log("DESCENDING", this.descending);

    if (!this.isJumping && this.descending) {
      console.log("i'm jumping @ this speed: ", speed)

      this.fallingSpeed = 0;
      // this.descending = false;
      // this.isJumping = true;

      //makes kirby move up 
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
      
      // collision.check();
      // this.destroyCheck();
      //  moojumper.jump();
    }  
  }

  // checkFall () {
  //   if (this.y < this.game.height - this.game.height) {
  //     this.setPosition(this.x, this.y + this.fallSpeed);
  //     this.fallSpeed += 1;
  //   // } else {
  //     // if (points == 0) this.fallStop();
  //     // else GameOver();
  //   }
  // }

  // update() {
  //   if (this.isJumping) this.game.checkJump();
  //   if (this.descending) this.checkFall();
  //   this.draw();
  // }

  moveDirection(direction) {
    switch(direction) {
      case "down":
        this.y += 5;
        break;
      case "left":
        this.x -= 5;
        break;
      case "right":
        this.x += 5;
        break;
    }
  }

}

export default Player;



