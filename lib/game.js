import Player from './player';
import Cloud from './cloud';

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.width = 500;
    this.height = 700;

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
    ctx.fillRect(0, 0, 500, 700); 

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
  }

  getRandomNum(num) {
    return Math.floor(Math.random() * Math.floor(num));
  }

  addClouds() {
    let firstCloud = new Cloud(250, 400, 80, 50);
    // let firstCloud = new Cloud((this.width / 2), 475, 80, 50);
    this.add(firstCloud);

    for (let i = 0; i <= 3; i++) {
      let newCloud = new Cloud(this.getRandomNum(400), this.getRandomNum(400) + 150, 80, 50);
      this.add(newCloud);
    }

    return this.clouds;
  }

  updateObjects() {
    this.checkCollision();
    this.checkJump();
  }
  
  checkCollision(object) {
    const player = this.players[0];

    if (object instanceof Cloud) {
      let cloud = object;

      if ((player.y + player.h <= cloud.y + (cloud.h / 2) + 20) && (player.y + player.h >= cloud.y + 5)) {
        if ((player.x >= cloud.x) && (player.x + player.w <= cloud.x + cloud.x)) {
          console.log("collision!");

          if (!this.player.isJumping && this.player.descending) {
            this.onLanding(cloud);
          }
        }
      }
    }
  }

  onLanding(cloud) {
    console.log("my cloud type is: ", cloud.type);
    
    if (cloud.type === 1) {
      console.log("i jump 6 pix");
      this.player.jump(6);
    } else if (cloud.type === 0) {
      console.log("i jump 5 pix");
      this.player.jump(5);
    }
    
    this.player.isJumping = true;
    this.player.fallSpeed = 0;
    this.player.descending = false;
  }

  checkJump() {
    if (this.player.y < 450) {
      // moveBackground(that.jumpSpeed * 0.5);
      this.clouds.forEach( (cloud, index) => {
        // cloud.y += 0.4;
        console.log("this is the y-speed", this.player.ySpeed);

        cloud.y -= this.player.ySpeed;

        if (cloud.y > this.height) {
          //if cloud moves outside the screen, we will generate another one on the top
          this.clouds[index] = new Cloud(this.getRandomNum(400), this.getRandomNum(400) - 50, 80, 50);
        }
      });
    }

    // else {
    //   if (that.jumpSpeed > 10)
    //     points++;
    //   // if player is in mid of the gamescreen
    //   // dont move player up, move obstacles down instead
    //   MoveCircles(that.jumpSpeed * 0.5);

    //   platforms.forEach(function (platform, ind) {
    //     platform.y += that.jumpSpeed;

    //     if (platform.y > height) {
    //       let type = ~~(Math.random() * 2);
    //       if (type == 0)
    //         type = 1;
    //       else
    //         type = 0;

    //       platforms[ind] = new Platform(Math.random() * (width - platformWidth), platform.y - height, type);
    //     }
    //   });
    // }

    // this.player.ySpeed -= 0.4;
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