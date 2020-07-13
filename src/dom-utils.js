const DomObj = (() => {
  const injectScores = filteredScore => {
    const scoresArr = filteredScore.slice(0, 12);
    const scoreTables = document.getElementsByClassName('score-table');
    const scoreElements = Array.from(HTMLCollection);
    let pos = 1;
    scoresArr.forEach(ele => {
      const newTr = document.createElement('tr');
      const posTd = document.createElement('td');
      posTd.innerText = pos;
      newTr.appendChild(posTd);
      pos += 1;
      const nameTd = document.createElement('td');
      nameTd.innerText = ele.user;
      newTr.appendChild(nameTd);
      const scoreTd = document.createElement('td');
      scoreTd.innerText = ele.score;
      newTr.appendChild(scoreTd);
      scoreElements.push(newTr);
    });
    const arr1 = scoreElements.slice(0, 4);
    const arr2 = scoreElements.slice(4, 8);
    const arr3 = scoreElements.slice(8, 12);
    const bigArray = [];
    bigArray.push(arr1);
    bigArray.push(arr2);
    bigArray.push(arr3);
    for (let i = 0; i < 3; i += 1) {
      bigArray[i].forEach(ele => {
        scoreTables[i].appendChild(ele);
      });
    }
  };
  return {
    injectScores,
  };
})();

export default DomObj;