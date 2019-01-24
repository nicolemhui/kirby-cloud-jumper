import Game from './game';
import GameView from './game_view';
import '../src/styles/app.css';
import '../src/styles/appStyles.scss'

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  const bg = new Image();
  bg.src = '../cloud-jumper/src/images/clouds_bg.png';
  ctx.drawImage(bg, 0, 0, 500, 700);
  
  let game = new Game(ctx);
  let newGameView = new GameView(game, ctx);
  const startBtn = document.getElementById("start-btn");


  startBtn.addEventListener("click", () => {
    ctx = canvas.getContext('2d');
    game = new Game(ctx);
    newGameView = new GameView(game, ctx);
    
    document.addEventListener("keydown", newGameView.handleKeys.bind(newGameView));
    document.addEventListener("keyup", newGameView.handleKeyRelease.bind(newGameView));
    
    newGameView.start();
  });
});