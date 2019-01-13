//require all other pieces and then impot into index.js file 

class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.clouds = this.game.addClouds();
    this.player = this.game.addPlayer();
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
      //Pressed ENTER, refresh the page to start new game if game is over 
      case 13:
        this.keyPressed === true;

        if (this.gameOver) {
          this.window.location.reload();
        }
        break;
    }
  }

  handleKeyRelease(e) {
    this.keyPressed = false;
  }

  //if player falls out of the screen
  checkGameOver() {
    if (this.player.y > 500) {
      console.log("game over");

      this.gameOver === true;
      this.drawGameOver();
    } else {
      this.gameOver == false;
    }
  }

  //TO DO: don't allow player to continue moving
  drawGameOver() {
    const canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

    ctx.fillStyle = "pink";
    ctx.font = "23px Arial";
    ctx.fillText("GAME OVER", this.game.WIDTH / 2 - 60, this.game.HEIGHT / 2 - 40);

    ctx.font = "23px Arial";
    ctx.fillText("Your score : " + this.player.score, this.game.WIDTH / 2 - 60, this.game.HEIGHT / 2 + 30);

    ctx.font = "23px Arial";
    ctx.fillText("Press enter for a new game", 60, this.game.HEIGHT / 2 + 50);

    // remove player from the canvas
    // this.player.erase?? 
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
    
    //UNCOMMENT AFTER TESTING;
    // if (!this.gameOver) {
    //   this.game.step(timeDelta);
    // }
    
    this.ctx.clearRect(0, 0, this.ctx.width, this.ctx.height);
    this.game.draw(this.ctx);
    this.drawScore();
    this.checkGameOver();
    this.lastTime = time;

    requestAnimationFrame(this.animate.bind(this));
  }
}

module.exports = GameView;