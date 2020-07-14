import Api from '../src/api';

const apiObj = Api;

let fakeFetchCall = false;

it('getScores should return the scores from the Score API', () => {
  const fakeFetch = url => {
    expect(url).toBe(
      'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/Ydrq34GZfJXn16CLPVYi/scores',
    );
    fakeFetchCall = true;
    const result = {
      result: [
        {
          user: 'Dev',
          score: 1250,
        },
      ],
    };
    return result;
  };
  apiObj.getScores(fakeFetch).then(result => {
    expect(result).toEqual({ result: [{ score: 1250, user: 'Dev' }] });
  });
  expect(fakeFetchCall).toBe(true);
});

it('saveScore should save the new score', () => {
  let fakeFetchCall = false;
  const fakeFetch = url => {
    expect(url).toBe(
      'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/Ydrq34GZfJXn16CLPVYi/scores',
    );
    fakeFetchCall = true;
    const result = { result: 'Leaderboard score created correctly.' };
    return result;
  };
  apiObj.saveScore('David', 20, fakeFetch).then(result => {
    expect(result).toEqual({ result: 'Leaderboard score created correctly.' });
  });
  expect(fakeFetchCall).toBe(true);
});
