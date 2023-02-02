var locationTextEl = document.querySelector('#location-text');
var crimeDataEl = document.querySelector('#crime-data');

/*This resultObj is taken from the mini-project. Not totally sure what it does,
but I think it's necessary*/
function printResults(resultObj) {
    console.log(resultObj);

    var resultCard = document.createElement('div');
    //Maybe do a "resultCard.classList.add" here

    var resultBody = document.createElement('div');
    //Maybe do a "resultBody.classList.add" here
    resultCard.append(resultBody);

    var titleEl = document.createElement('h3');
    titleEl.textContent = resultObj.title;

    var bodyContentEl = document.createElement('p');
    bodyContentEl.innerHTML = ""; //Put CDE API data here

    resultBody.append(titleEl, bodyContentEl);

    crimeDataEl.append(resultCard);

}