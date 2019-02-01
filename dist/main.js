/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/cloud_jumper.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/cloud.js":
/*!**********************!*\
  !*** ./lib/cloud.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Cloud {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = null;

    //0 is not moving, 1 is moving
    this.moving = Math.floor(Math.random() * 3);
    this.type = Math.floor(Math.random() * 2);

    const dirArray = ["none", "x", "y"];
    this.moveDirection = dirArray[Math.floor(Math.random() * dirArray.length)];
    
    this.cloudImage = null;
  }

  draw() {
    const canvasEl = document.getElementById("canvas");
    let ctx = canvasEl.getContext("2d");
    
    const cloud = new Image();
    cloud.src = '../cloud-jumper/src/images/cloud.png';
    const grayCloud = new Image();
    grayCloud.src = '../cloud-jumper/src/images/gray_cloud.png';

    if (this.type === 1) {
      this.cloudImage = ctx.drawImage(cloud, this.x, this.y, this.w + 50, this.h + 50);
    } else {
      this.cloudImage = ctx.drawImage(grayCloud, this.x, this.y, this.w, this.h + 20);
    }
  }

  move() {  
    if (this.moving === 1) {
      if (this.moveDirection === "y") {
        this.y += 1.5;
        this.checkBoundaries();
      } else if (this.moveDirection === "x") {
        this.x += 1.5;
        this.checkBoundaries();
      }
    }
  }

  checkBoundaries() {
    if (this.x >= 700 || this.x <= 0) {
      this.x -= 2;
    } else if (this.y >= 700 || this.y <= 0) {
      this.y -= 2;
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Cloud);

/***/ }),

/***/ "./lib/cloud_jumper.js":
/*!*****************************!*\
  !*** ./lib/cloud_jumper.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./lib/game.js");
/* harmony import */ var _game_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game_view */ "./lib/game_view.js");
/* harmony import */ var _game_view__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_game_view__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _src_styles_app_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../src/styles/app.css */ "./src/styles/app.css");
/* harmony import */ var _src_styles_app_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_src_styles_app_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _src_styles_appStyles_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../src/styles/appStyles.scss */ "./src/styles/appStyles.scss");
/* harmony import */ var _src_styles_appStyles_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_src_styles_appStyles_scss__WEBPACK_IMPORTED_MODULE_3__);





document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  const bg = new Image();
  bg.src = '../cloud-jumper/src/images/clouds_bg.png';
  ctx.drawImage(bg, 0, 0, 500, 700);
  
  let game = new _game__WEBPACK_IMPORTED_MODULE_0__["default"](ctx);
  let newGameView = new _game_view__WEBPACK_IMPORTED_MODULE_1___default.a(game, ctx);
  const startBtn = document.getElementById("start-btn");


  startBtn.addEventListener("click", () => {
    ctx = canvas.getContext('2d');
    game = new _game__WEBPACK_IMPORTED_MODULE_0__["default"](ctx);
    newGameView = new _game_view__WEBPACK_IMPORTED_MODULE_1___default.a(game, ctx);
    
    document.addEventListener("keydown", newGameView.handleKeys.bind(newGameView));
    document.addEventListener("keyup", newGameView.handleKeyRelease.bind(newGameView));
    
    newGameView.start();
  });
});

/***/ }),

/***/ "./lib/enemy.js":
/*!**********************!*\
  !*** ./lib/enemy.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Enemy {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  draw() {
    const canvasEl = document.getElementById("canvas");
    let ctx = canvasEl.getContext("2d");
    
    const cloud = new Image();
    cloud.src = '../cloud-jumper/src/images/cloud.png';

    const enemy = new Image();
    // enemy.src = '../cloud-jumper/src/images/moonja.png';
    enemy.src = '../cloud-jumper/src/images/bandana1.png';

    ctx.drawImage(cloud, this.x - 30, this.y + 10, this.w + 80, this.h + 50);
    ctx.drawImage(enemy, this.x, this.y, this.w, this.h);
  }

  move() {
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Enemy);

/***/ }),

/***/ "./lib/game.js":
/*!*********************!*\
  !*** ./lib/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./lib/player.js");
/* harmony import */ var _cloud__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cloud */ "./lib/cloud.js");
/* harmony import */ var _star__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./star */ "./lib/star.js");
/* harmony import */ var _enemy__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./enemy */ "./lib/enemy.js");





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
    if (object instanceof _player__WEBPACK_IMPORTED_MODULE_0__["default"]) {
      this.players.push(object);
    } else if (object instanceof _cloud__WEBPACK_IMPORTED_MODULE_1__["default"]) {
      this.clouds.push(object);
    } else if (object instanceof _star__WEBPACK_IMPORTED_MODULE_2__["default"]) {
      this.stars.push(object);
    } else if (object instanceof _enemy__WEBPACK_IMPORTED_MODULE_3__["default"]) {
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
      if (object instanceof _cloud__WEBPACK_IMPORTED_MODULE_1__["default"]) {
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
    const player = new _player__WEBPACK_IMPORTED_MODULE_0__["default"](this);
    this.add(player);
    return player;
  }

  addStars() {
    const firstStar = new _star__WEBPACK_IMPORTED_MODULE_2__["default"](100, 100, 65, 65);
    this.add(firstStar);
    return this.stars;
  }
 
  addEnemies() {
    const firstEnemy = new _enemy__WEBPACK_IMPORTED_MODULE_3__["default"](600, 200, 50, 75);
    this.add(firstEnemy);
    return this.enemies;
  }
 
  addClouds() {
    let firstCloud = new _cloud__WEBPACK_IMPORTED_MODULE_1__["default"](200, 650, 80, 50);
    this.add(firstCloud);
    let secondCloud = new _cloud__WEBPACK_IMPORTED_MODULE_1__["default"](150, 550, 80, 50);
    this.add(secondCloud);
    
    for (let i = 0; i <= 6; i++) {
      let newCloud = new _cloud__WEBPACK_IMPORTED_MODULE_1__["default"](this.getRandomNum(400), this.getRandomNum(500), 80, 50);
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

    if ((object instanceof _cloud__WEBPACK_IMPORTED_MODULE_1__["default"]) && player.descending) {
      let cloud = object;

      if ((player.y + player.h <= cloud.y + (cloud.h / 2) + 20) && (player.y + player.h >= cloud.y + 5)) {
        if ((player.x >= cloud.x - 20) && (player.x + player.w <= cloud.x + cloud.w + 50)) {
          if (!this.player.isJumping && this.player.descending) {
            this.onLanding(cloud);
          }
        }
      }
    } else if (object instanceof _star__WEBPACK_IMPORTED_MODULE_2__["default"]) {
      let star = object;
      if (((player.y >= star.y) || (player.y + player.h >= star.y)) && ((player.y + player.h <= star.y + star.h) || (player.y <= star.y + star.h))) {
        if (((player.x >= star.x) || (player.x + player.w >= star.x)) && ((player.x + player.w <= star.x + star.w) || (player.x <= star.x + star.w))) {
          this.score += 1000;
          this.disappear(star);
        }
      }
    } else if (object instanceof _enemy__WEBPACK_IMPORTED_MODULE_3__["default"]) {
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
    object.y = 800;
  }

  onLanding(cloud) {
    this.player.jumpSpeed = 0;
    this.jumpSound.play();

    if (cloud.type === 1) {
      this.score += 100;
      this.player.jump(7);
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

        if (cloud.y > 700) {
          this.clouds[index] = new _cloud__WEBPACK_IMPORTED_MODULE_1__["default"](this.getRandomNum(400), this.getRandomNum(500), 80, 50);
        }
      });

        this.stars.forEach ((star, idx) => {
          star.y -= this.player.jumpSpeed;

          if (star.y > this.height * 4) {
            this.stars[idx] = new _star__WEBPACK_IMPORTED_MODULE_2__["default"](this.getRandomNum(400), this.getRandomNum(100), 65, 65);
          }
        });
        
        this.enemies.forEach ((enemy, idx) => {
          enemy.y -= this.player.jumpSpeed;

          if (enemy.y > this.height * 3) {
            this.enemies[idx] = new _enemy__WEBPACK_IMPORTED_MODULE_3__["default"](this.getRandomNum(400), this.getRandomNum(100), 50, 75);
          }
        });
          
    }
  }

  allObjects() {
    return [].concat(this.clouds, this.stars, this.enemies, this.players);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Game);

/***/ }),

/***/ "./lib/game_view.js":
/*!**************************!*\
  !*** ./lib/game_view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

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

    this.gameSong = new Audio("../cloud-jumper/src/sounds/above_the_clouds.mp3");
    this.fallingSound = new Audio("../cloud-jumper/src/sounds/falling_down.m4a");
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
      case 13:
        this.keyPressed === true;

        if (!this.game.gameOver) {
          null;
        } else {
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
      this.drawGameOver();
      this.gameSong.pause();

      this.fallingSound.loop = false;
      this.fallingSound.play();
    } 
  }
  
  drawGameOver() {
    const canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    
    ctx.fillStyle = ""
    ctx.fillStyle = "#e581ff";
    ctx.font = "30px 'Luckiest Guy'";
    ctx.fillText("GAME OVER", this.game.width / 2 - 60, this.game.height / 2 - 40);
    ctx.font = "23px Arial";
    ctx.fillText("Your score : " + this.game.score, this.game.width / 2 - 70, this.game.height / 2 + 30);
    ctx.fillText("             Press enter for a new game", 30, this.game.height / 2 + 50);
  }

  drawScore() {
    const canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

    ctx.fillStyle = "#e581ff";
    ctx.font = "20px 'Luckiest Guy'";
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
      this.drawScore();
      this.checkGameOver();
      requestAnimationFrame(this.animate.bind(this));
    } else {
      this.drawGameOver();
    }
  }

  
}

module.exports = GameView;

/***/ }),

/***/ "./lib/player.js":
/*!***********************!*\
  !*** ./lib/player.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Player {
  constructor(game) {
    this.game = game;
    this.x = (game.width / 2) - 50;
    this.y = 100;
    this.w = 50;
    this.h = 50;
    this.direction = "right";

    this.jumpSpeed = 0;
    this.fallingSpeed = 0;

    this.isJumping = false;
    this.descending = true;
  }

  draw() {
    const canvasEl = document.getElementById("canvas");
    let ctx = canvasEl.getContext("2d");
    
    const kirbyright = new Image();
    kirbyright.src = '../cloud-jumper/src/images/kirby_r.png';
    
    const kirbyleft = new Image();
    kirbyleft.src = '../cloud-jumper/src/images/kirby_l.png';
    
    if (this.direction === "left") {
      ctx.drawImage(kirbyleft, this.x, this.y, 50, 50);
    } else if (this.direction === "right") {
      ctx.drawImage(kirbyright, this.x, this.y, 50, 50);
    }
  }

  move() {
    this.falling();

    this.fallingSpeed += 0.1;
    this.y += this.fallingSpeed + this.jumpSpeed;

    this.checkBoundaries();
  }
  
  checkBoundaries() {
    if (this.x + this.w >= this.game.width) {
      this.x = 0;
    } else if (this.x + this.w <= 0) {
      this.x = 440;
    } else if (this.y + this.h <= 0) {
      this.y = 500;
    }
  }

  jump(speed) {
    if (!this.isJumping && this.descending) {
      this.fallingSpeed = 0;
      this.jumpSpeed -= speed;
    }
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }
  
  falling() {
    this.jumpSpeed += 0.05;
    if (this.jumpSpeed <= 0) {
      this.descending = true;
      this.isJumping = false;
    }  
  }

  moveDirection(direction) {
    switch(direction) {
      case "down":
        this.y += 5;
        break;
      case "left":
        this.direction = "left";
        this.x -= 4;
        break;
        case "right":
        this.direction = "right";
        this.x += 4;
        break;
    }
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Player);





/***/ }),

/***/ "./lib/star.js":
/*!*********************!*\
  !*** ./lib/star.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Star {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  draw() {
    const canvasEl = document.getElementById("canvas");
    let ctx = canvasEl.getContext("2d");
    
    const star = new Image();
    star.src = '../cloud-jumper/src/images/star1.png';

    ctx.drawImage(star, this.x, this.y, this.w - 20, this.h - 20);
  }

  move(){

  }
}

/* harmony default export */ __webpack_exports__["default"] = (Star);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/styles/app.css":
/*!*******************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--4-1!./node_modules/sass-loader/lib/loader.js??ref--4-2!./src/styles/app.css ***!
  \*******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, "/* body {\n  background-image: url('/Users/Kenneth/Desktop/cloud-jumper/src/images/pastel_sky.jpg');\n  background-size: cover;\n  font-family: 'Pontano Sans', sans-serif;\n  margin: 0 auto;\n}\n\n.game-container {\n  margin-left: 300px;\n  margin-top: 100px;\n  display: flex;\n}\n\n.instructions {\n  background-color: rgba(173, 216, 230, 0.7);\n  width: 600px;\n  height: 700px;\n  color: white;\n  text-align: center;\n\n}\n\nh3 {\n  font-size: 50px;\n  letter-spacing: .07em;\n}\n\np {\n  font-size: 20px;\n}\n\n#canvas {\n  margin: 0 auto;\n}\n\n.canvas-container {\n  width: 1000px;\n  height: 700px;\n  margin: 0 auto;\n}\n\nimg {\n  display: none;\n}\n\n#start-btn {\n  font-size: 30px;\n  font-family: Arial, Helvetica, sans-serif;\n  color: white;\n  letter-spacing: .03em;\n  text-transform: uppercase;\n  width: 150px;\n  height: 60px;\n  border-radius: 200px;\n  border: 1px solid pink;\n  background-color: lightpink;\n}\n\n#start-btn:hover {\n  background-color: white;\n  color: lightpink;\n  font-weight: bold;\n  transition: 0.2s;\n} */\n", "",{"version":3,"sources":["/Users/Kenneth/Desktop/cloud-jumper/src/styles/src/styles/app.css"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;IA+DI","file":"app.css","sourcesContent":["/* body {\n  background-image: url('/Users/Kenneth/Desktop/cloud-jumper/src/images/pastel_sky.jpg');\n  background-size: cover;\n  font-family: 'Pontano Sans', sans-serif;\n  margin: 0 auto;\n}\n\n.game-container {\n  margin-left: 300px;\n  margin-top: 100px;\n  display: flex;\n}\n\n.instructions {\n  background-color: rgba(173, 216, 230, 0.7);\n  width: 600px;\n  height: 700px;\n  color: white;\n  text-align: center;\n\n}\n\nh3 {\n  font-size: 50px;\n  letter-spacing: .07em;\n}\n\np {\n  font-size: 20px;\n}\n\n#canvas {\n  margin: 0 auto;\n}\n\n.canvas-container {\n  width: 1000px;\n  height: 700px;\n  margin: 0 auto;\n}\n\nimg {\n  display: none;\n}\n\n#start-btn {\n  font-size: 30px;\n  font-family: Arial, Helvetica, sans-serif;\n  color: white;\n  letter-spacing: .03em;\n  text-transform: uppercase;\n  width: 150px;\n  height: 60px;\n  border-radius: 200px;\n  border: 1px solid pink;\n  background-color: lightpink;\n}\n\n#start-btn:hover {\n  background-color: white;\n  color: lightpink;\n  font-weight: bold;\n  transition: 0.2s;\n} */\n"],"sourceRoot":""}]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/styles/appStyles.scss":
/*!**************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--4-1!./node_modules/sass-loader/lib/loader.js??ref--4-2!./src/styles/appStyles.scss ***!
  \**************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, "body {\n  background-image: url(\"http://www.jakpost.travel/imgfiles/full/31/315598/pastel-sky-wallpaper.jpg\");\n  background-size: cover;\n  font-family: 'Pontano Sans', sans-serif;\n  margin: 0 auto; }\n\n.game-container {\n  margin-left: 300px;\n  margin-top: 100px;\n  display: flex; }\n\n.instructions {\n  background-color: rgba(173, 216, 230, 0.7);\n  width: 600px;\n  height: 700px;\n  align-items: center;\n  text-align: center;\n  color: white; }\n  .instructions h3 {\n    font-family: \"Luckiest Guy\", cursive;\n    font-size: 45px;\n    letter-spacing: .07em;\n    background: red;\n    background: -webkit-linear-gradient(left, #ffcf31, #d6f787, #69c2c2, #a5a5dc, #e9ace9);\n    background: -o-linear-gradient(right, #ffcf31, #d6f787, #69c2c2, #a5a5dc, #e9ace9);\n    background: -moz-linear-gradient(right, #ffcf31, #d6f787, #69c2c2, #a5a5dc, #e9ace9);\n    background: linear-gradient(to right, #ffcf31, #d6f787, #69c2c2, #a5a5dc, #e9ace9);\n    -webkit-background-clip: text;\n    -webkit-text-fill-color: transparent;\n    margin-bottom: 0px; }\n  .instructions h4 {\n    font-family: \"Luckiest Guy\", cursive;\n    color: #e581ff;\n    font-size: 22px;\n    letter-spacing: 0.3em;\n    margin-bottom: 12px; }\n  .instructions p {\n    color: #966ff5;\n    font-size: 16px;\n    width: 90%;\n    margin: 0 auto; }\n  .instructions span {\n    color: #2f48ac;\n    font-size: 18px;\n    font-weight: bold;\n    text-transform: uppercase;\n    font-family: \"Luckiest Guy\", cursive; }\n  .instructions img {\n    width: 30px;\n    margin-left: 10%;\n    margin-right: 10px; }\n  .instructions #white-cloud {\n    width: 40px;\n    height: 40px;\n    margin-left: 10%;\n    margin-right: 0px; }\n  .instructions ul {\n    list-style: none;\n    text-align: left; }\n    .instructions ul li {\n      color: #966ff5; }\n\n.arrows {\n  font-size: 30px;\n  display: inline-block;\n  margin: 0px 20px; }\n  .arrows .fab {\n    width: 40px;\n    height: 40px;\n    background-color: black;\n    color: blue; }\n\n#press-start {\n  color: white; }\n\n#canvas {\n  margin: 0 auto; }\n\n.canvas-container {\n  width: 1000px;\n  height: 700px;\n  margin: 0 auto; }\n  .canvas-container img {\n    display: none; }\n\n#start-btn {\n  font-size: 35px;\n  font-family: 'Luckiest Guy', sans-serif;\n  color: white;\n  letter-spacing: .07em;\n  padding-top: 10px;\n  text-transform: uppercase;\n  width: 150px;\n  height: 70px;\n  border-radius: 200px;\n  border: 1px solid pink;\n  background-color: lightpink; }\n\n#start-btn:hover {\n  background-color: white;\n  color: lightpink;\n  font-weight: bold;\n  transition: 0.2s; }\n\n.hidden-div {\n  display: none; }\n\n.developer-icons {\n  margin-top: 30px; }\n  .developer-icons i {\n    font-size: 35px;\n    color: #6992de; }\n  .developer-icons i:hover {\n    color: rgba(38, 86, 206, 0.7);\n    transition: 0.3ms; }\n", "",{"version":3,"sources":["/Users/Kenneth/Desktop/cloud-jumper/src/styles/src/styles/appStyles.scss","/Users/Kenneth/Desktop/cloud-jumper/src/styles/src/styles/themeColors.scss"],"names":[],"mappings":"AAGA;EACE,oGAAmG;EACnG,uBAAsB;EACtB,wCAAuC;EACvC,eAAc,EACf;;AAED;EACE,mBAAkB;EAClB,kBAAiB;EACjB,cAAa,EACd;;AAED;EACE,2CAA0C;EAC1C,aAAY;EACZ,cAAa;EACb,oBAAmB;EACnB,mBAAkB;EAClB,aAAY,EA8Db;EApED;IASI,qCCnBgC;IDoBhC,gBAAe;IACf,sBAAqB;IACrB,gBAAe;IACf,uFAA6I;IAC7I,mFAAyI;IACzI,qFAA2I;IAC3I,mFAAyI;IACzI,8BAA6B;IAC7B,qCAAoC;IACpC,mBAAkB,EACnB;EApBH;IAuBI,qCCjCgC;IDkChC,eAAc;IACd,gBAAe;IACf,sBAAqB;IACrB,oBAAmB,EACpB;EA5BH;IA+BI,eAAc;IACd,gBAAe;IACf,WAAU;IACV,eAAc,EAEf;EApCH;IAuCI,eAAuB;IACvB,gBAAe;IACf,kBAAiB;IACjB,0BAAyB;IACzB,qCAAoC,EACrC;EA5CH;IA+CI,YAAW;IACX,iBAAgB;IAChB,mBAAkB,EACnB;EAlDH;IAqDI,YAAW;IACX,aAAY;IACZ,iBAAgB;IAChB,kBAAiB,EAClB;EAzDH;IA4DI,iBAAgB;IAChB,iBAAgB,EAKjB;IAlEH;MAgEM,eAAc,EACf;;AAKL;EACE,gBAAe;EACf,sBAAqB;EACrB,iBAAgB,EAQjB;EAXD;IAMI,YAAW;IACX,aAAY;IACZ,wBAAuB;IACvB,YAAW,EACZ;;AAGH;EACE,aAAY,EACb;;AAGD;EACE,eAAc,EACf;;AAED;EACE,cAAa;EACb,cAAa;EACb,eAAc,EAKf;EARD;IAMI,cAAa,EACd;;AAGH;EACE,gBAAe;EACf,wCAAuC;EACvC,aAAY;EACZ,sBAAqB;EACrB,kBAAiB;EACjB,0BAAyB;EACzB,aAAY;EACZ,aAAY;EACZ,qBAAoB;EACpB,uBAAsB;EACtB,4BAA2B,EAC5B;;AAED;EACE,wBAAuB;EACvB,iBAAgB;EAChB,kBAAiB;EACjB,iBAAgB,EACjB;;AAED;EACE,cAAa,EACd;;AAED;EACE,iBAAgB,EAWjB;EAZD;IAII,gBAAe;IACf,eAAc,EACf;EANH;IASI,8BAA6B;IAC7B,kBAAiB,EAClB","file":"appStyles.scss","sourcesContent":["@import 'themeColors';\n$theme-font:    verdana, sans-serif;\n\nbody {\n  background-image: url('http://www.jakpost.travel/imgfiles/full/31/315598/pastel-sky-wallpaper.jpg');\n  background-size: cover;\n  font-family: 'Pontano Sans', sans-serif;\n  margin: 0 auto;\n}\n\n.game-container {\n  margin-left: 300px;\n  margin-top: 100px;\n  display: flex;\n}\n\n.instructions {\n  background-color: rgba(173, 216, 230, 0.7);\n  width: 600px;\n  height: 700px;\n  align-items: center;\n  text-align: center;\n  color: white;\n\n  h3 {\n    font-family: $title-font;\n    font-size: 45px;\n    letter-spacing: .07em;\n    background: red;\n    background: -webkit-linear-gradient(left, rgb(255, 207, 49) , rgb(214, 247, 135), rgb(105, 194, 194), rgb(165, 165, 220), rgb(233, 172, 233));\n    background: -o-linear-gradient(right, rgb(255, 207, 49) , rgb(214, 247, 135), rgb(105, 194, 194), rgb(165, 165, 220), rgb(233, 172, 233));\n    background: -moz-linear-gradient(right, rgb(255, 207, 49) , rgb(214, 247, 135), rgb(105, 194, 194), rgb(165, 165, 220), rgb(233, 172, 233));\n    background: linear-gradient(to right, rgb(255, 207, 49) , rgb(214, 247, 135), rgb(105, 194, 194), rgb(165, 165, 220), rgb(233, 172, 233));\n    -webkit-background-clip: text;\n    -webkit-text-fill-color: transparent;\n    margin-bottom: 0px;\n  }\n\n  h4 {\n    font-family: $title-font;\n    color: #e581ff;\n    font-size: 22px;\n    letter-spacing: 0.3em;\n    margin-bottom: 12px;\n  }\n\n  p {\n    color: #966ff5;\n    font-size: 16px;\n    width: 90%;\n    margin: 0 auto;\n\n  }\n  \n  span {\n    color: rgb(47, 72, 172);\n    font-size: 18px;\n    font-weight: bold;\n    text-transform: uppercase;\n    font-family: \"Luckiest Guy\", cursive;\n  }\n\n  img {\n    width: 30px;\n    margin-left: 10%;\n    margin-right: 10px;\n  }\n\n  #white-cloud {\n    width: 40px;\n    height: 40px;\n    margin-left: 10%;\n    margin-right: 0px;\n  }\n\n  ul {\n    list-style: none;\n    text-align: left;\n\n    li {\n      color: #966ff5;\n    }\n  }\n\n}\n\n.arrows {\n  font-size: 30px;\n  display: inline-block;\n  margin: 0px 20px;\n\n  .fab {\n    width: 40px;\n    height: 40px;\n    background-color: black;\n    color: blue;\n  }\n}\n\n#press-start {\n  color: white;\n}\n\n\n#canvas {\n  margin: 0 auto;\n}\n\n.canvas-container {\n  width: 1000px;\n  height: 700px;\n  margin: 0 auto;\n\n  img {\n    display: none;\n  }\n}\n\n#start-btn {\n  font-size: 35px;\n  font-family: 'Luckiest Guy', sans-serif;\n  color: white;\n  letter-spacing: .07em;\n  padding-top: 10px;\n  text-transform: uppercase;\n  width: 150px;\n  height: 70px;\n  border-radius: 200px;\n  border: 1px solid pink;\n  background-color: lightpink;\n}\n\n#start-btn:hover {\n  background-color: white;\n  color: lightpink;\n  font-weight: bold;\n  transition: 0.2s;\n}\n\n.hidden-div {\n  display: none;\n}\n\n.developer-icons {\n  margin-top: 30px;\n  \n  i {\n    font-size: 35px;\n    color: #6992de;\n  }\n\n  i:hover {\n    color: rgba(38, 86, 206, 0.7);\n    transition: 0.3ms;\n  }\n}","\n// $themeColor-Light: #f3e2c7;\n// $themeColor-Dark: #b68d4c;\n\n// $theme-font: 'Luckiest Guy', cursive;\n$theme-font: 'Pontano Sans', sans-serif; \n$title-font: 'Luckiest Guy', cursive;"],"sourceRoot":""}]);



/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return '@media ' + item[2] + '{' + content + '}';
      } else {
        return content;
      }
    }).join('');
  }; // import a list of modules into the list


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (i = 0; i < modules.length; i++) {
      var item = modules[i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = '(' + item[2] + ') and (' + mediaQuery + ')';
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || '';
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;
  return '/*# ' + data + ' */';
}

/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = typeof options.transform === 'function'
		 ? options.transform(obj.css) 
		 : options.transform.default(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "./src/styles/app.css":
/*!****************************!*\
  !*** ./src/styles/app.css ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--4-1!../../node_modules/sass-loader/lib/loader.js??ref--4-2!./app.css */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/styles/app.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/styles/appStyles.scss":
/*!***********************************!*\
  !*** ./src/styles/appStyles.scss ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--4-1!../../node_modules/sass-loader/lib/loader.js??ref--4-2!./appStyles.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/styles/appStyles.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ })

/******/ });
//# sourceMappingURL=main.js.map