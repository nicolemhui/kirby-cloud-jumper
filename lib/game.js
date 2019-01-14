import Player from './player';
import Cloud from './cloud';
import Star from './star';

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.width = 500;
    this.height = 600;

    //all game obj
    this.players = [];
    this.clouds = [];
    this.stars = [];

    this.player = null;
    
    // this.highScore = 0;
    this.score = 0;
  }

  add(object) {
    if (object instanceof Player) {
      this.players.push(object);
    } else if (object instanceof Cloud) {
      this.clouds.push(object);
    } else if (object instanceof Star) {
      this.stars.push(object);
    } else {
      throw new Error("unknown type of object");
    }
  }

  draw(ctx) {
    // ctx.fillStyle = "gray";
    // ctx.fillRect(0, 0, 500, 600); 

    ctx.drawImage(bg, 0, 0, 500, 700);
    ctx.drawImage(bg, 0, 700, 500, 700);

    this.allObjects().forEach( object => {
      if (object instanceof Star) {
      }
      object.draw(ctx);
    });

    this.player = this.players[0];

    this.updateObjects();
  }

  // addBackground() {
  //   const bg = new Image("../src/images/clouds_bg.png");
  //   this.ctx.drawImage(bg, 0, 0, 500, 700);
  //   this.ctx.drawImage(bg, 0, 700, 500, 700);
  // }

  // scrollUp(time, ctx) {
  //   ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

  //   if (this.distance >= Game.DIM_X) {
  //     this.distance = 0;
  //   }
  //   this.distance += this.speed;

  //   ctx.drawImage(this.background, -this.distance, 0, this.background.width, this.background.height);
  //   ctx.drawImage(this.background, this.background.width - this.distance, 0, this.background.width, this.background.height);

  // }
  
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

  addStars() {
    const firstStar = new Star(250, 400, 50, 50);
    this.add(firstStar);

    // for (let i = 0; i < 1; i++) {
    //   let newStar = new Star(this.getRandomNum(400), this.getRandomNum(400), 50, 50);
    //   this.add(newStar);
    // }

    return this.stars;
  }

  getRandomNum(num) {
    return Math.floor(Math.random() * Math.floor(num));
  }

  addClouds() {
    let firstCloud = new Cloud(250, 400, 80, 50);
    // let firstCloud = new Cloud((this.width / 2), 475, 80, 50);
    this.add(firstCloud);

    for (let i = 0; i <= 4; i++) {
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
        console.log("player's y coordinate", this.player.y);
        console.log("cloud's y range", cloud.y + 5, cloud.y + (cloud.h / 2));

        console.log("player's x coordinate", this.player.x);
        console.log("cloud's x range", cloud.x, cloud.x + cloud.w);

        if ((player.x >= cloud.x - 20) && (player.x + player.w <= cloud.x + cloud.w + 50)) {
        //old code below
        // if ((player.x >= cloud.x) && (player.x + player.w <= cloud.x + cloud.x)) {

          console.log("collision!");

          if (!this.player.isJumping && this.player.descending) {
            this.score += 1;
            this.onLanding(cloud);
          }
        }
      }
    }
  }

  onLanding(cloud) {
    this.player.jumpSpeed = 0;

    if (cloud.type === 1) {
      console.log("i jump 10 pix");
      this.player.jump(10);
    } else if (cloud.type === 0) {
      console.log("i jump 7 pix");
      this.player.jump(6);
    }
    
    this.player.isJumping = true;
    this.player.fallSpeed = 0;
    this.player.descending = false;
  }

  // checkScore() {
  //   const topWall = this.game.walls[0];
  //   const bottomWall = this.game.walls[1];

  //   if (topWall.x && bottomWall.x == 10) {
  //     this.score += 1;
  //   }
  // }

  //UNCOMMENT
  checkJump() {
    if (this.player.y > 600) {
      console.log("set new position");
      this.player.setPosition(this.player.x, this.player.y - this.player.jumpSpeed);
      console.log("position x = ", this.player.x);
      console.log("position y = ", this.player.y);

    } else if (this.player.y < 600) {
      // moveBackground(that.jumpSpeed * 0.5);
      this.clouds.forEach( (cloud, index) => {
        // cloud.y += 0.4;
        // console.log("this is the y-speed", this.player.jumpSpeed);

        cloud.y -= this.player.jumpSpeed;

        if (cloud.y > this.height) {
          //if cloud moves outside the screen, we will generate another one on the top
          this.clouds[index] = new Cloud(this.getRandomNum(400), this.getRandomNum(400) - 50, 80, 50);
        }
      });
    }
  }

  

  allObjects() {
    return [].concat(this.clouds, this.stars, this.players);
  }
}

export default Game;