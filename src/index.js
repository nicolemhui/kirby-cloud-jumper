import _ from 'lodash';
import Game from '../lib/game';
import GameView from '../lib/game_view';

import './styles/app.css';
import './styles/appStyles.scss'

// function component() {
//   let element = document.createElement('div');
//   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
//   return element;
// }
// document.body.appendChild(component());


document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const startBtn = document.getElementById("start-btn");

  
  startBtn.onclick = () => {
    // startBtn.className += " hidden";
    const game = new Game(ctx);
    const newGameView = new GameView(game, ctx);
  
    document.addEventListener("keydown", newGameView.handleKeys.bind(newGameView));
    document.addEventListener("keyup", newGameView.handleKeyRelease.bind(newGameView));
  
    newGameView.start();
  };
});










//PUT ANIMATION IN GAME LOOP
// const body = document.getElementsByTagName('body')[0];
// let id;

// function gameLoop() {
//   // Animate stuff
//   id = requestAnimationFrame(gameLoop)
// }

// body.addEventListener('click', () => {
//   cancelAnimationFrame(id)
// })