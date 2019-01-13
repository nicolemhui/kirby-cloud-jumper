import Player from './player';
// import Wall from './wall';
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
    this.WIDTH = 900;
    this.HEIGHT = 500;

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
      object.move(delta);
    });
  }

  step(delta) {
    this.moveObjects(delta);
    
  }
  
  addPlayer() {
    const player = new Player(this, [0, 0]);
    this.add(player);
    return player;
  }

  getRandomNum(num) {
    return Math.floor(Math.random() * Math.floor(num));
  }

  addClouds() {
    for (let i = 0; i <=5; i++) {
      let newCloud = new Cloud(this.getRandomNum(600), this.getRandomNum(200) + 25, 80, 50, 0.5);
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
  // addWalls() {
  //   const topWall = new Wall(400, 0, 80, 200, 1);
  //   const bottomWall = new Wall(400, 400, 80, 200, 1);
    
  //   this.add(topWall);
  //   this.add(bottomWall);

  //   return this.walls;
  // }

  allObjects() {
    return [].concat(this.players, this.clouds);
  }
}

export default Game;