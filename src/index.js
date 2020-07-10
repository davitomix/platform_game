import './style/main.scss';
import Game from './game-init';


const gameInit = () => {
  window.game = new Game();
};

const start = () => {
  // Await sequences
  // display - Leaderboard
  gameInit();
};

start();