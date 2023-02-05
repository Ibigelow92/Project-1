// Modal
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Local Storage, Previous Searches
var searchInput = document.querySelector('#inputText');
var searchModal = document.querySelector('#myModal');
var previousSearches = document.querySelector('#previous-searches');

var searches = [];

function renderSearches () {
  previousSearches.innerHTML = "";

  for (var i = 0; i < searches.length; i++) {
    var search = searches[i];

    var li = document.createElement("li");
    li.textContent = search;
    li.setAttribute("data-index", i);
    
  }
}

function init() {
  var storedSearches = JSON.parse(localStorage.getItem("searches"));
  if (storedSearches !== null) {
    searches = storedSearches;
  }

  renderSearches();
}

function storeSearches() {
  localStorage.setItem("searches", JSON.stringify(searches));
}

myModal.addEventListener("submit", function(event) {
  event.preventDefault();
  var inputText = searchInput.value.trim();

  if(input ==="") {
    return;
  }

  searches.push(input);
  searchInput.value = "";

  storeSearches();
  renderSearches();

});

init();







let map;
let marker;
let geocoder;
let responseDiv;
let response;


function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: { lat: -34.397, lng: 150.644 },
    mapTypeControl: false,
  });
  geocoder = new google.maps.Geocoder();

  const inputText = document.createElement("input");

  inputText.type = "text";
  inputText.placeholder = "12345";

  const submitButton = document.createElement("input");

  submitButton.type = "button";
  submitButton.value = "Let's go!";
  submitButton.classList.add("button", "button-primary");

  const clearButton = document.createElement("input");

  clearButton.type = "button";
  clearButton.value = "Clear";
  clearButton.classList.add("button", "button-secondary");
  response = document.createElement("pre");
  response.id = "response";
  response.innerText = "";
  responseDiv = document.createElement("div");
  responseDiv.id = "response-container";
  responseDiv.appendChild(response);

  const instructionsElement = document.createElement("p");

  instructionsElement.id = "instructions";
  // instructionsElement.innerHTML =
  //   "<strong>Instructions</strong>: Enter an address in the textbox to geocode or click on the map to reverse geocode.";
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputText);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(submitButton);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(clearButton);
  map.controls[google.maps.ControlPosition.LEFT_TOP].push(instructionsElement);
  map.controls[google.maps.ControlPosition.LEFT_TOP].push(responseDiv);
  marker = new google.maps.Marker({
    map,
  });
  map.addListener("click", (e) => {
    geocode({ location: e.latLng });
  });
  submitButton.addEventListener("click", () =>{
    geocode({ address: inputText.value })
    //This is my best attempt at modifying the crime API to our needs
    //
    const crimeReportEL = document.getElementById("crime-data-p");
    //
    const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '2566f44acbmshc353c19280ffd39p19e170jsn2c683f7c8010',
      'X-RapidAPI-Host': 'crime-data-by-zipcode-api.p.rapidapi.com'
      }
    };

    fetch('https://crime-data-by-zipcode-api.p.rapidapi.com/crime_data?zip=' + inputText.value, options)
      .then(function (response) {
        return response.json();
      })
      //
      .then(function(data) {
        //console.log(data)
        //crimeReportEL.innerText = JSON.stringify(data)
      //var parsedData = JSON.stringify(data)
      console.log(data)
      
      crimeReportEL.innerHTML=
      `
      <ul>
      <li>Overall Crime Grade: ${data.Overall['Overall Crime Grade']}</li>
      <li>Violent Crime Grade: ${data.Overall['Violent Crime Grade']}</li>
      <li>Property Crime Grade: ${data.Overall['Property Crime Grade']}</li>
      <li>Other Crime Grade: ${data.Overall['Other Crime Grade']}</li>
      <li>Fact: ${data.Overall['Fact']}</li>    
      </ul>
      `
      })
      //
      .catch(err => console.error(err));

      });
      clearButton.addEventListener("click", () => {
      clear();
      });
      clear();
}

function clear() {
  marker.setMap(null);
  responseDiv.style.display = "none";
}

function geocode(request) {
  clear();
  geocoder
    .geocode(request)
    .then((result) => {
      const { results } = result;

      map.setCenter(results[0].geometry.location);
      marker.setPosition(results[0].geometry.location);
      marker.setMap(map);
      // responseDiv.style.display = "block";
      // response.innerText = JSON.stringify(result, null, 2);
      // return results;
    })
    .catch((e) => {
      alert("Geocode was not successful for the following reason: " + e);
    });
}


window.initMap = initMap;


//<li>Property: ${data['Crime BreakDown'][0]['0']['Total Violent Crime']}</li>
//<li>Other:</li>          

