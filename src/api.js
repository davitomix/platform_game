import DomObj from './dom-utils';

const Api = (() => {
  const dommer = DomObj;

  const saveScore = async (playerName, playerScore) => {
    const scoreData = {
      user: playerName,
      score: playerScore,
    };
    try {
      const response = await fetch(
        'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/Ydrq34GZfJXn16CLPVYi/scores',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(scoreData),
        },
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const sortScores = scores => {
    scores.sort((a, b) => b.score - a.score);
  };

  const getScores = async () => {
    try {
      const response = await fetch(
        'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/Ydrq34GZfJXn16CLPVYi/scores',
        {
          method: 'GET',
        },
      );
      const data = await response.json();
      sortScores(data.result);
      /* eslint-disable  max-len */
      const filteredScores = data.result.filter((v, i, a) => a.findIndex(t => t.user === v.user) === i);
      /* eslint-enable  max-len */
      dommer.injectScores(filteredScores);
      return response;
    } catch (error) {
      return error;
    }
  };

  return {
    saveScore,
    getScores,
  };
})();

export default Api;