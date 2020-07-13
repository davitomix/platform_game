import './style/main.scss';
import Game from './game-init';
import Api from './api';

const apiObj = Api;

// ----------------------------------
const userInputDiv = document.getElementById('user-input');
const gameContainer = document.getElementById('game-container');

const get = item => localStorage.getItem(item);

const set = (item, value) => {
  localStorage.setItem(item, value);
  return get();
};

apiObj.getScores();

const startGame = () => {
  gameContainer.style.display = 'flex';
  userInputDiv.style.display = 'none';
  window.game = new Game();
};

const formSubmit = form => {
  if (!form.checkValidity()) {
    form.reportValidity();
  } else {
    set('Player', form[0].value);
    set('Score', 0);
    form.style.display = 'none';
    startGame();
  }
};

const player = get('Player') || null;

const loadForm = () => {
  userInputDiv.innerHTML = `<form id="user-name">
    <label for="name">Name: </label>
    <input type="text" name="name" placeholder="Player Name" required />
    <button type="button" name="Start" id="btn-start-game">Start Game</button>
  </form>`;

  const form = document.getElementById('user-name');

  form.addEventListener('submit', () => {
    formSubmit(form);
  });

  const btnStart = document.getElementById('btn-start-game');
  btnStart.addEventListener('click', () => {
    formSubmit(form);
  });
};

if (!player) {
  loadForm();
} else {
  userInputDiv.innerHTML = `<h4>${get('Player')}</h4>
  <button id="btn-change-player" type="button" name="changePlayer">Change Player</button>
  <button id="btn-start-game" type="button" name="startGame">Start game</button>`;

  const changePlayerBtn = document.getElementById('btn-change-player');
  const startGameBtn = document.getElementById('btn-start-game');

  startGameBtn.addEventListener('click', startGame);
  changePlayerBtn.addEventListener('click', loadForm);
}