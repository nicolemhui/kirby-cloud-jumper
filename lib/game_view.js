//require all other pieces and then impot into index.js file 

class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.player = this.game.addPlayer();
    this.clouds = this.game.addClouds();
    this.keyPressed = false;
    this.gameOver = false; 
    this.paused = false;
    this.isPlaying = true;

  }

  // bindKeyHandlers() {
  //   Object.keys(GameView.MOVES).forEach((k) => {
  //     const movePos = GameView.MOVES[k];
  //     // debugger;
  //     this.player.moveDirection(movePos);
  //   });
  // }

  handleKeys(event) {
    if (!event) return null;
  
    switch (event.keyCode) {
      case 38:
        this.player.moveDirection("up");
        this.keyPressed === true;
        break;
      case 40:
        this.player.moveDirection("down");
        this.keyPressed === true;
        break;
      case 37:
        this.player.moveDirection("left");
        this.keyPressed === true;
        break;
      case 39:
        this.player.moveDirection("right");
        this.keyPressed === true;
        break;
      //Pressed SPACE
      case 32: 
        this.player.moveDirection("jump");   
        this.keyPressed === true;
        break;
      //Pressed ENTER
      case 13:
        if (this.gameOver) {
          this.window.location.reload();
      }
    }
  }

  handleKeyRelease(e) {
    this.keyPressed = false;
  }

  gameOver() {
    if (!this.player.clearedWall) {
      this.gameOver === true;
    } else {
      this.gameOver == false;
    }
  }

  drawGameOver() {
    const canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

    ctx.fillStyle = "yellow";
    // ctx.font = "italic " + 20 + "pt Arial ";
    ctx.font = "23px trsMillion ";
    ctx.fillText("GAME OVER", this.game.WIDTH / 2 - 60, this.game.HEIGHT / 2 - 40);

    ctx.font = "15px trsMillion ";
    ctx.fillText("Your score : " + this.game.player.score, this.game.WIDTH / 2 - 60, this.game.HEIGHT / 2 + 30);

    ctx.font = "15px trsMillion ";
    ctx.fillText("Press enter for a new game", 60, this.game.HEIGHT / 2 + 50);
  }

  drawScore() {
    const canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + this.player.score, 10, 20);
  }

  start() {
    // this.bindKeyHandlers();
    this.handleKeys();
    this.lastTime = 0;
    // start the animation
    requestAnimationFrame(this.animate.bind(this));
    // window.alert("GAME OVER");
  }


  animate(time) {
    const timeDelta = time - this.lastTime;

    if (!this.gameOver) {
      this.game.step(timeDelta);
    }
    
    this.ctx.clearRect(0, 0, this.ctx.width, this.ctx.height);
    this.game.draw(this.ctx);
    this.drawScore();
    this.lastTime = time;

    requestAnimationFrame(this.animate.bind(this));
  }
}

GameView.MOVES = {
  w: [0, -1],
  a: [-1, 0],
  s: [0, 1],
  d: [1, 0],
};

module.exports = GameView;


// class GameView {
//   constructor(ctx, xAxis, yAxis, width, height, movemoveSpeed) {
//     this.ctx = ctx;
//     this.xAxis = xAxis;
//     this.yAxis = yAxis;
//     this.width = width;
//     this.height = height;
//     this.moveSpeed = moveSpeed;
//     this.ctx = 
//   }

//   // Draw call
//   draw() {
//     ctx.drawImage(0, 0, 360, 640, this.x, this.y, this.w, this.h);
//   }

//   // Update call
//   updateBackground() {
//     // Make it move to left with a constant speed
//     this.xAxis -= this.moveSpeed;

//     // If it gets out from the screen, make it jump to the starting position so it seamlessly keeps scrolling endlessly
//     if (this.xAxis <= -360) {
//       this.xAxis = 360;
//     }
//   }

// }