import './style/main.scss';
import Game from './game-init';
import Api from './api';

const playerName = document.getElementById('player-name');
const playerScore = document.getElementById('player-score');
const saveButton = document.getElementById('save-data');
const getButton = document.getElementById('get-data');
const apiObj = Api;

const gameInit = () => {
  window.game = new Game();
};

const start = () => {
  // Await sequences
  // display - Leaderboard
  gameInit();
  // apiObj.getScores();
  saveButton.addEventListener('click', () => {
    apiObj.saveScore(playerName.value, playerScore.value);
  });

  getButton.addEventListener('click', () => {
    apiObj.getScores();
  });
};

start();