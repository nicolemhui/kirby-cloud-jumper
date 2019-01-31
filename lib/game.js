import Player from './player';
import Cloud from './cloud';
import Star from './star';
import Enemy from './enemy';

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.width = 500;
    this.height = 700;

    this.players = [];
    this.clouds = [];
    this.stars = [];
    this.enemies = [];

    this.player = null;
    this.gameOver = false;
    
    this.jumpSound = new Audio("../cloud-jumper/src/sounds/jump.wav");
    this.fallingSound = new Audio("../cloud-jumper/src/sounds/falling_down.m4a");

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
    const bg = new Image();
    bg.src = '../cloud-jumper/src/images/clouds_bg.png';

    ctx.clearRect(0, 0, this.ctx.width, this.ctx.height);
    ctx.drawImage(bg, 0, 0, 500, 700);
    ctx.drawImage(bg, 0, 700, 500, 700);

    this.allObjects().forEach( object => {
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
    const firstStar = new Star(100, 100, 50, 50);
    this.add(firstStar);
    return this.stars;
  }
 
  addEnemies() {
    const firstEnemy = new Enemy(600, 300, 50, 50);
    this.add(firstEnemy);
    return this.enemies;
  }
 
  addClouds() {
    let firstCloud = new Cloud(200, 650, 80, 50);
    this.add(firstCloud);
    let secondCloud = new Cloud(150, 550, 80, 50);
    this.add(secondCloud);
    
    for (let i = 0; i <= 5; i++) {
      let newCloud = new Cloud(this.getRandomNum(400), this.getRandomNum(500), 80, 50);
      this.add(newCloud);
    }
    
    return this.clouds;
  }
  
  getRandomNum(num) {
    return Math.floor(Math.random() * Math.floor(num));
  }

  updateObjects() {
    this.checkJump();
  }
  
  checkCollision(object) {
    const player = this.players[0];

    if (object instanceof Cloud) {
      let cloud = object;

      if ((player.y + player.h <= cloud.y + (cloud.h / 2) + 20) && (player.y + player.h >= cloud.y + 5)) {
        if ((player.x >= cloud.x - 20) && (player.x + player.w <= cloud.x + cloud.w + 50)) {
          if (!this.player.isJumping && this.player.descending) {
            this.onLanding(cloud);
          }
        }
      }
    } else if (object instanceof Star) {
      let star = object;
      if (((player.y >= star.y) || (player.y + player.h >= star.y)) && ((player.y + player.h <= star.y + star.h) || (player.y <= star.y + star.h))) {
        if (((player.x >= star.x) || (player.x + player.w >= star.x)) && ((player.x + player.w <= star.x + star.w) || (player.x <= star.x + star.w))) {
          this.score += 1000;
          this.disappear(star);
        }
      }
    } else if (object instanceof Enemy) {
      let enemy = object;

      if (((player.y >= enemy.y) || (player.y + player.h >= enemy.y)) && ((player.y + player.h <= enemy.y + enemy.h) || (player.y <= enemy.y + enemy.h))) {
        if (((player.x >= enemy.x) || (player.x + player.w >= enemy.x)) && ((player.x + player.w <= enemy.x + enemy.w) || (player.x <= enemy.x + enemy.w))) {
          this.player.isJumping = false;
          this.player.descending = true;

          const allObjs = this.allObjects();
          allObjs.forEach( obj => this.disappear(obj) );
          
          this.gameOver = true;
        }
      }
    }
  }

  disappear(object) {
    object.x = 700;
  }

  onLanding(cloud) {
    this.player.jumpSpeed = 0;
    this.jumpSound.play();

    if (cloud.type === 1) {
      this.score += 100;
      this.player.jump(6);
    } else if (cloud.type === 0) {
      this.score += 60;
      this.player.jump(5);
    }
    
    this.player.isJumping = true;
    this.player.fallSpeed = 0;
    this.player.descending = false;
  }

  checkJump() {
    if (this.player.y > 700) {
      this.gameOver = true;

    } else if (this.player.y < 700) {
      this.clouds.forEach( (cloud, index) => {
        cloud.y -= this.player.jumpSpeed;

        if (cloud.y > 650) {
          this.clouds[index] = new Cloud(this.getRandomNum(400), this.getRandomNum(500), 80, 50);
        }
      });

        this.stars.forEach ((star, idx) => {
          star.y -= this.player.jumpSpeed;

          if (star.y > this.height * 4) {
            this.stars[idx] = new Star(this.getRandomNum(400), this.getRandomNum(100), 50, 50);
          }
        })
        
        this.enemies.forEach ((enemy, idx) => {
          enemy.y -= this.player.jumpSpeed;

          if (enemy.y > this.height * 3) {
            this.enemies[idx] = new Enemy(this.getRandomNum(400), this.getRandomNum(100), 50, 50);
          }
        })
          
    }
  }

  allObjects() {
    return [].concat(this.clouds, this.stars, this.enemies, this.players);
  }
}

export default Game;