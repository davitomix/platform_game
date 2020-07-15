import DomObj from '../src/dom-utils';

const dommer = DomObj;

document.body.innerHTML += '<div id="scoreboard"><table class="score-table"></table><table class="score-table"></table><table class="score-table"></table></div>';
document.body.innerHTML += '<table id="score-table" class="score-table"><tr><th id="pos">Pos</th><th id="player">Player</th><th id="score">Score</th></tr></table>';

const position = document.getElementById('pos');
const player = document.getElementById('player');
const score = document.getElementById('score');
const scores = {
  result: [
    {
      user: 'Dev',
      score: 1250,
    },
  ],
};

it('renderScores should return a table', () => {
  dommer.injectScores(scores.result);
  const scoreboardTable = document.getElementById('scoreboard');
  expect(scoreboardTable.id).not.toBe(null);
});

it('table should contain required columns', () => {
  const scoreTable = document.getElementById('score-table');
  expect(scoreTable.innerHTML).toEqual('<tbody><tr><th id="pos">Pos</th><th id="player">Player</th><th id="score">Score</th></tr></tbody>');
});

it('table header should contain pos', () => {
  expect(position.innerHTML).toEqual('Pos');
});

it('table header position should have content', () => {
  expect(position.innerHTML).not.toBe(null);
});

it('table header should contain player', () => {
  expect(player.innerHTML).toEqual('Player');
});

it('table header player should have content', () => {
  expect(player.innerHTML).not.toBe(null);
});

it('table header should contain score', () => {
  expect(score.innerHTML).toEqual('Score');
});

it('table header score should have content', () => {
  expect(score.innerHTML).not.toBe(null);
});
