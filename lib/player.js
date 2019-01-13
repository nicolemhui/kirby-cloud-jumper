const NORMAL_FRAME_TIME_DELTA = 1000 / 60;
import Cloud from './cloud';

class Player {
  constructor(game) {
    this.game = game;
    this.x = (game.WIDTH / 2) - 50;
    this.y = 300;
    this.w = 50;
    this.h = 50;
    this.ySpeed = 0;
    this.fallingSpeed = 0;

    //jumping
    this.isJumping = false;
    this.descending = false;

    this.clearedWall = true;

    this.score = 0;
  }

  draw() {
    const canvasEl = document.getElementById("canvas");
    let ctx = canvasEl.getContext("2d");

    // ctx.fillStyle = "yellow";
    // ctx.fillRect(this.x, this.y, 50, 50);
    ctx.drawImage(kirby, this.x, this.y, 50, 50);
  }

  // move(timeDelta) {
  //   // this.falling();

  //   // const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
  //     // offsetY = this.ySpeed * velocityScale;

  //   this.fallingSpeed += 0.1;
  //   this.y += this.fallSpeed + this.ySpeed;
  //   // this.y = this.y + offsetY;

  //   // this.checkCollision();
  //   // this.checkScore();
  // }

  move(timeDelta) {
    //UNCOMMENT AFTER TESTING!!
    // this.falling();

    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
      offsetY = this.ySpeed * velocityScale;
    this.y = this.y + offsetY;

    this.checkBoundaries();
    // this.checkCollision();
    // this.checkScore();
  }
  
  checkBoundaries() {
    if (this.x + this.w >= this.game.WIDTH) {
      //if player hits the right side of screen, then 1) reset their position to 0;
      this.x = 0;
    } else if (this.x + this.w <= 0) {
      this.x = 440;
    }
  }

  checkScore() {
    const topWall = this.game.walls[0];
    const bottomWall = this.game.walls[1];

    if (topWall.x && bottomWall.x == 10) {
      this.score += 1;
    }
  }

  jump() {
    this.fallingSpeed = 0;
    this.ySpeed -= 0.5;
    // this.ySpeed -= 0.4;
    this.descending = false;
  }

  //UNCOMMENT AFTER TESTNG
  // jump() {
  //   this.fallingSpeed = 0;
  //   this.ySpeed -= 5;
  //   // this.ySpeed -= 0.4;
  //   this.descending = false;
  // }
  
  falling() {
    this.ySpeed += 0.1;
    if (this.ySpeed <= 0) {
      this.descending = true;
      // collision.check();
      // this.destroyCheck();
      //  moojumper.jump();
    }  
  }

  moveDirection(direction) {
    switch(direction) {
      case "up": 
        this.y -= 5;
        //UNCOMMENT OUT AFTER TESTING
        // this.ySpeed -= 0.5;
        // this.fallingSpeed = 0;
        break;
      case "down":
        this.y += 5;
        break;
      case "left":
        this.x -= 5;
        break;
      case "right":
        this.x += 5;
        break;
      case "jump":
        this.isJumping = true;
        this.jump();
        break;
    }
  }

}

export default Player;



