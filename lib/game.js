import Player from './player';
import Cloud from './cloud';

window.reqAnimationFrame = (function () {
  return window.requestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.width = 500;
    this.height = 500;

    //all game obj
    this.players = [];
    this.clouds = [];

    this.player = null;
    
    this.lowestPlank = 0;
  }

  add(object) {
    if (object instanceof Player) {
      this.players.push(object);
    } else if (object instanceof Cloud) {
      this.clouds.push(object);
    } else {
      throw new Error("unknown type of object");
    }
  }

  draw(ctx) {
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, 500, 500); 

    this.allObjects().forEach( object => {
      object.draw(ctx)
    });

    this.player = this.players[0];

    this.updateObjects();
  }
  
  moveObjects(delta) {
    this.allObjects().forEach( object => {
      if (object instanceof Cloud) {
        this.checkCollision(object);
      }
      object.move(delta);
    });
  }
  
  step(delta) {
    this.moveObjects(delta);
  }
  
  addPlayer() {
    const player = new Player(this);
    this.add(player);
    return player;
  }
  
  addBackground() {
    this.ctx.drawImage(bg, 0, 0, 500, 500);
    this.ctx.drawImage(bg, 500, 0, 500, 500);

    // this.add(background1);
    // this.add(background2);

    // return this.backgrounds;
  }

  getRandomNum(num) {
    return Math.floor(Math.random() * Math.floor(num));
  }

  addClouds() {
    for (let i = 0; i <= 1; i++) {
      let newCloud = new Cloud(this.getRandomNum(400), this.getRandomNum(400) - 50, 80, 50);
      this.add(newCloud);
    }

    return this.clouds;
  }


  updateObjects() {
    this.checkJump();

    let lowestCloud;
    
    if (!this.clouds === undefined) {
      for (let i = 0; i <= this.clouds.length; i++) {
        let cloud = this.clouds[i];
        console.log("lowest cloud ----", lowestCloud);
        
        if (lowestCloud === undefined || lowestCloud.y <= cloud.y) {
          lowestCloud = cloud;
        }
      }
      
      if (this.players[0].y <= lowestCloud.y) {
        console.log("reset the screen");
        this.players[0].x = 300;
      }
    }
      

    // if (this.players[0].y <= this.co) {
    //   console.log("reset the screen");
    //   this.player.x = 300;
    // }
  }
  

  // drawClouds() {
  //   for (i = 0; i <= 4; i++) {
  //     lowestPlank += rand((10)) + 15;
  //     this.cloud.addClouds();
  //   }
  //   for (i = 5; i <= 20; i++) {
  //     lowestPlank += rand((40)) + 15;
  //     this.cloud.addClouds();
  //   }
  // }

  checkCollision(cloud) {
    //UNCOMEMENT --
    // only if player is falling; so turn isFalling to true;

    const player = this.players[0];
    
    if ((player.y + player.h <= cloud.y + (cloud.h / 2) + 20) && (player.y + player.h >= cloud.y + 5)) {
      if ((player.x >= cloud.x) && (player.x + player.w <= cloud.x + cloud.x)) {
        // console.log("testing kirby's x position", player.x);
        // console.log("cloud x + w", cloud.x + cloud.w);
        // console.log("cloud x - w", cloud.x - cloud.w);
        player.jump();
        // this.updateObjects();
        console.log("collision!");
        // window.location.reload();
      }
    }
  }

  checkJump() {
    if (this.player.y > 400) {
    // if (this.player.y > this.height * 0.4) {
      this.player.setPosition(this.player.x, this.player.y - this.player.ySpeed);
    } else {
      // moveBackground(that.jumpSpeed * 0.5);
      this.clouds.forEach( (cloud, index) => {
        cloud.y += 0.4;
        // cloud.y += this.player.jumpSpeed;

        if (cloud.y > this.height) {
          //if cloud moves outside the screen, we will generate another one on the top
          this.clouds[index] = new Cloud(this.getRandomNum(400), this.getRandomNum(400) - 50, 80, 50);
        }
      });
    }


    // this.player.ySpeed--;
    // if (this.player.ySpeed == 0) {
    //   this.player.isJumping = false;
    //   this.player.descending = true;
    //   this.player.fallingSpeed = 0.1;
    // }
  }


  allObjects() {
    return [].concat(this.clouds, this.players);
  }
}

export default Game;