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
    this.WIDTH = 500;
    this.HEIGHT = 700;

    //all game obj
    this.players = [];
    this.clouds = [];
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
    ctx.fillRect(0, 0, 900, 500); 

    this.allObjects().forEach( object => {
      object.draw(ctx)
    });
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

  getRandomNum(num) {
    return Math.floor(Math.random() * Math.floor(num));
  }

  addClouds() {
    for (let i = 0; i <=1; i++) {
      let newCloud = new Cloud(this.getRandomNum(400), this.getRandomNum(600) - 50, 80, 50);
      this.add(newCloud);
    }

    return this.clouds;
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
    const player = this.players[0];
    
    // if ((player.y + player.h <= cloud.y + cloud.h) && (player.y + player.h >= cloud.y - 15)) {
    if ((player.y + player.h <= cloud.y + (cloud.h / 2) + 20) && (player.y + player.h >= cloud.y + 5)) {
      if ((player.x >= cloud.x) && (player.x + player.w <= cloud.x + cloud.x)) {
        // console.log("testing kirby's x position", player.x);
        // console.log("cloud x + w", cloud.x + cloud.w);
        // console.log("cloud x - w", cloud.x - cloud.w);

        console.log("collision!");
        // window.location.reload();
      }
    }
  }

  // 315 - 278 = 37

  // checkCollisions(player, object) {
  //   let playerX = player.pos[0];
  //   let playerY = player.pos[1];
  //   let collisionDir = null;

  //   if (playerX < object.x + object.width &&
  //     playerX + player.width > object.x && playerY < object.y + object.height &&
  //     player.height + playerY > object.y) {
  //     let y = (playerY + player.height / 2) - (object.y + object.height / 2);
  //     let x = (playerX + player.width / 2) - (object.x + object.width / 2);
  //     let vY = (player.height / 2 + object.height / 2) - Math.abs(y);
  //     let vX = (player.width / 2 + object.width / 2) - Math.abs(x);
  //     if (vX >= vY) {
  //       if (y < 0) {
  //         collisionDir = "top";
  //         player.pos[1] -= vY;
  //         this.player.key = 0;
  //       } else if (y >= 0) {
  //         collisionDir = "bottom";
  //         player.pos[1] += vY;
  //       }
  //     } else {
  //       if (x < -60) {
  //       }
  //     }
  //   }
  //   return collisionDir;
  // }

  

  allObjects() {
    return [].concat(this.clouds, this.players);
  }
}

export default Game;