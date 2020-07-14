import DomObj from './dom-utils';

const Api = (() => {
  const dommer = DomObj;
  const idApi = 'Ydrq34GZfJXn16CLPVYi';

  const sortScores = scores => {
    scores.sort((a, b) => b.score - a.score);
  };

  const getScores = async (fetch) => {
    try {
      const response = await fetch(
        `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${idApi}/scores`,
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

  const saveScore = async (playerName, playerScore, fetch) => {
    const scoreData = {
      user: playerName,
      score: playerScore,
    };
    try {
      const response = await fetch(
        `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${idApi}/scores`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(scoreData),
        },
      );
      if (response.ok) {
        const data = await response.json();
        getScores(fetch).then(scores => dommer.injectScores(scores.result));
        return data;
      }
      return response;
    } catch (error) {
      return error;
    }
  };

  return {
    saveScore,
    getScores,
    idApi,
  };
})();

export default Api;