import DomObj from '../src/dom-utils';

const dommer = DomObj;

document.body.innerHTML += '<div id="scoreboard"><table class="score-table"></table><table class="score-table"></table><table class="score-table"></table></div>';

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
