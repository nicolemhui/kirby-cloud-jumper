import Player from './player';
import Cloud from './cloud';
import Star from './star';
import Enemy from './enemy';

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.width = 500;
    this.height = 700;

    //all game obj
    this.players = [];
    this.clouds = [];
    this.stars = [];
    this.enemies = [];

    this.player = null;
    
    this.jumpSound = new Audio("../src/sounds/jump.wav");
    this.fallingSound = new Audio("../src/sounds/falling_down.m4a");

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
    } else if (object instanceof Enemy) {
      this.enemies.push(object);
    } else {
      throw new Error("unknown type of object");
    }
  }

  draw(ctx) {
    // ctx.fillStyle = "gray";
    // ctx.fillRect(0, 0, 500, 700); 

    ctx.drawImage(bg, 0, 0, 500, 700);
    ctx.drawImage(bg, 0, 700, 500, 700);

    this.allObjects().forEach( object => {
      
      // if object is a star, draw it every 5 seconds;
      if (object instanceof Star) {
        setTimeout( () => object.draw(ctx), 1000);
      }
      
      object.draw(ctx);
    });

    this.player = this.players[0];

    this.updateObjects();
  }
  
  moveObjects(delta) {
    this.allObjects().forEach( object => {
      if (object instanceof Cloud) {
        object.checkBoundaries();
      }
      this.checkCollision(object);
      object.move();
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
    const firstStar = new Star(300, 100, 50, 50);
    // const firstStar = new Star(500, 0, 50, 50);
    this.add(firstStar);
    return this.stars;
  }
 
  addEnemies() {
    const firstEnemy = new Enemy(100, 300, 50, 50);
    // const firstStar = new Enemy(500, 0, 50, 50);
    this.add(firstEnemy);
    return this.enemies;
  }
 
  addClouds() {
    let firstCloud = new Cloud(250, 700, 80, 50);
    this.add(firstCloud);
    
    for (let i = 0; i <= 4; i++) {
      let newCloud = new Cloud(this.getRandomNum(400), this.getRandomNum(400) + 150, 80, 50);
      this.add(newCloud);
    }
    
    return this.clouds;
  }
  
  getRandomNum(num) {
    return Math.floor(Math.random() * Math.floor(num));
  }

  updateObjects() {
    // this.checkCollision();
    this.checkJump();
  }
  
  checkCollision(object) {
    const player = this.players[0];

    if (object instanceof Cloud) {
      let cloud = object;

      if ((player.y + player.h <= cloud.y + (cloud.h / 2) + 20) && (player.y + player.h >= cloud.y + 5)) {
        if ((player.x >= cloud.x - 20) && (player.x + player.w <= cloud.x + cloud.w + 50)) {
        //old code below
        // if ((player.x >= cloud.x) && (player.x + player.w <= cloud.x + cloud.x)) {

          // console.log("collision!");

          if (!this.player.isJumping && this.player.descending) {
            this.onLanding(cloud);
          }
        }
      }
    } else if (object instanceof Star) {
      let star = object;
      // console.log("this is the star's x & y position", star.x, star.y);
      // console.log("star's total x position", star.x + star.w);
      // console.log("star's total y position", star.y + star.h);
      // console.log("this is kirby's x & y position", this.players[0].x, this.players[0].y);
      // console.log("kirby's total x position", this.players[0].x + this.players[0].w);
      // console.log("kirby's total y position", this.players[0].y + this.players[0].h);

      if (((player.y >= star.y) || (player.y + player.h >= star.y)) && ((player.y + player.h <= star.y + star.h) || (player.y <= star.y + star.h))) {
        // console.log("player y, star y", player.y, star.y);
        
        if (((player.x >= star.x) || (player.x + player.w >= star.x)) && ((player.x + player.w <= star.x + star.w) || (player.x <= star.x + star.w))) {
          // console.log("player x, star x", player.x, star.x);

          console.log(" I HIT THE STAR ");
          this.score += 1000;
          star.disappear();
        }
      }
    } else if (object instanceof Enemy) {
      let enemy = object;

      if (((player.y >= enemy.y) || (player.y + player.h >= enemy.y)) && ((player.y + player.h <= enemy.y + enemy.h) || (player.y <= enemy.y + enemy.h))) {
        if (((player.x >= enemy.x) || (player.x + player.w >= enemy.x)) && ((player.x + player.w <= enemy.x + enemy.w) || (player.x <= enemy.x + enemy.w))) {
          //game is over
          console.log(" I HIT THE ENEMY ");
          
          this.fallingSound.loop = false;
          this.fallingSound.play();
          
          this.clouds.forEach( cloud => cloud.disappear() );

          // this.player.isHit = true;        
          
          this.player.isJumping = false;
          this.player.descending = true;
        }
      }
    }
  }

  onLanding(cloud) {
    this.player.jumpSpeed = 0;
    this.jumpSound.play();

    if (cloud.type === 1) {
      console.log("i jump 6 pix");
      this.score += 100;
      this.player.jump(6);
    } else if (cloud.type === 0) {
      console.log("i jump 5 pix");
      this.score += 60;
      this.player.jump(5);
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
    if (this.player.y > 700) {
      // console.log("set new position");
      this.player.setPosition(this.player.x, this.player.y - this.player.jumpSpeed);
      // console.log("position x = ", this.player.x);
      // console.log("position y = ", this.player.y);

// UNCOMMENT
    } else if (this.player.y < 700) {
      this.clouds.forEach( (cloud, index) => {
        // cloud.y += 0.4;
        // console.log("this is the y-speed", this.player.jumpSpeed);

        cloud.y -= this.player.jumpSpeed;

        // if (cloud.y > 550) {
        if (cloud.y > this.height) {
          //if cloud moves outside the screen, we will generate another one on the top
          this.clouds[index] = new Cloud(this.getRandomNum(400), this.getRandomNum(400), 80, 50);
        }
      });

        this.stars.forEach ((star, idx) => {
          star.y -= this.player.jumpSpeed;

          if (star.y > this.height * 4) {
            this.stars[idx] = new Star(this.getRandomNum(400), this.getRandomNum(100), 50, 50);
          }
        })
          
    }
  }

  allObjects() {
    return [].concat(this.clouds, this.stars, this.enemies, this.players);
  }
}

export default Game;