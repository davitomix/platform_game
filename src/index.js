import './style/main.scss';
import Game from './game-init';
import Api from './api';


const apiObj = Api;

const gameInit = () => {
  window.game = new Game();
};

const start = () => {
  // Await sequences
  // display - Leaderboard
  gameInit();
  apiObj.getScores();
};

start();