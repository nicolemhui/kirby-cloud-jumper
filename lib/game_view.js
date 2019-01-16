//require all other pieces and then impot into index.js file 
window.reqAnimationFrame = (function () {
  return window.requestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.clouds = this.game.addClouds();
    this.player = this.game.addPlayer();
    this.stars = this.game.addStars();
    this.enemies = this.game.addEnemies();
    this.keyPressed = false;
    // this.gameOver = false; 
    
    this.paused = false;
    this.isPlaying = true;

    this.gameSong = new Audio("../src/sounds/above_the_clouds.mp3");
    this.fallingSound = new Audio("../src/sounds/falling_down.m4a");
  }

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
      //Pressed ENTER, refresh the page to start new game if game is over 
      case 13:
        this.keyPressed === true;

        if (!this.game.gameOver) {
          null;
        } else {
          console.log("i pressed enter")
          window.location.reload();
        }
        break;
    }
  }

  handleKeyRelease(e) {
    this.keyPressed = false;
  }

  //if player falls out of the screen
  checkGameOver() {
    if (this.game.gameOver) {
      console.log("game over");

      // while(this.player.y < 700) {
      //   // this.player.y += 5;
      //   // console.log("kirby's y position")
      //   this.player.isJumping = false;
      //   this.player.descending = true;
      // }

      // window.cancelAnimationFrame(this.animate);

      this.drawGameOver();
      this.gameSong.pause();

      this.fallingSound.loop = false;
      this.fallingSound.play();
    } 
  }
  
  drawGameOver() {
    const canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    
    ctx.fillStyle = "pink";
    ctx.font = "23px Arial";
    ctx.fillText("GAME OVER", this.game.width / 2 - 60, this.game.height / 2 - 40);
    ctx.fillText("Your score : " + this.game.score, this.game.width / 2 - 60, this.game.height / 2 + 30);
    ctx.fillText("Press enter for a new game", 60, this.game.height / 2 + 50);
  }

  drawScore() {
    const canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + this.game.score, 10, 20);
  }

  start() {
    this.handleKeys();
    this.lastTime = 0;

    this.gameSong.volume = 0.3;
    this.gameSong.play();

    // start the animation
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeDelta = time - this.lastTime;

    if (!this.game.gameOver) {
      this.game.step(timeDelta);
      this.game.draw(this.ctx);
      this.lastTime = time;
      this.checkGameOver();
      requestAnimationFrame(this.animate.bind(this));
    } else {
      this.drawScore();
    }
  }

  
}

module.exports = GameView;