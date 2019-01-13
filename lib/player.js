const NORMAL_FRAME_TIME_DELTA = 1000 / 60;
import Cloud from './cloud';

class Player {
  constructor(game) {
    this.game = game;
    this.x = (game.WIDTH / 2) - 50;
    this.y = 400;
    this.w = 50;
    this.h = 50;
    this.ySpeed = 0;

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

  move(timeDelta) {
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
      offsetY = this.ySpeed * velocityScale;

    this.y = this.y + offsetY;

    // this.checkCollision();
    // this.checkScore();
  }
  
  checkCollision() {
    const topWall = this.game.walls[0];
    const bottomWall = this.game.walls[1];

    if ((this.x + (this.w / 3) >= topWall.x) && (this.x <= topWall.x + topWall.w)) {
      // console.log("testing kirby's x position", this.x);
      // console.log("top wall x", topWall.x);
      // console.log("X HIT");

      // console.log("testing kirby's y position", this.y);
      // console.log("top wall y", topWall.y + topWall.h);
      if (this.y - this.h <= topWall.y + topWall.h || this.y + this.h >= bottomWall.y) {
        // debugger;
        // if (this.y <= bottomWall.y + topWall.h || this.y + this.h >= topWall.y + 480) {
        // console.log("reload the game");
        this.clearedWall = false;
        window.location.reload();
      }
    }


    // if (this.x + this.w >= topWall.x && this.x <= topWall.x + topWall.w) {
    //   console.log("testing walls", walls);
    //   console.log("testing kirby's x position", this.x + this.w);

    //   if (this.y <= topWall.y + topWall.h || this.y + this.h >= bottomWall.y) {
    //     // if (this.y <= bottomWall.y + topWall.h || this.y + this.h >= topWall.y + 480) {
    //     console.log("reload the game");
    //     this.clearedWall = false;
    //     window.location.reload();
    //   }
    // }
  }

  checkScore() {
    const topWall = this.game.walls[0];
    const bottomWall = this.game.walls[1];

    if (topWall.x && bottomWall.x == 10) {
      this.score += 1;
    }
  }

  jump() {

  }

  moveDirection(direction) {
    switch(direction) {
      case "up": 
        this.y -= 5;
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
        this.y -= 20;
        // this.jump();
        break;
    }
  }

}

export default Player;



