import _ from 'lodash';
import Game from './game';
import GameView from './game_view';
import '../src/styles/app.css';
import '../src/styles/appStyles.scss'

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const bg = new Image();
  bg.src = '../cloud-jumper/src/images/clouds_bg.png';
  
  ctx.drawImage(bg, 0, 0, 500, 700);
  
  const game = new Game(ctx);
  const newGameView = new GameView(game, ctx);

  const startBtn = document.getElementById("start-btn");
  
  startBtn.onclick = () => {
    document.addEventListener("keydown", newGameView.handleKeys.bind(newGameView));
    document.addEventListener("keyup", newGameView.handleKeyRelease.bind(newGameView));
  
    newGameView.start();
  };
});
