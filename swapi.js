// Write your SWAPI code in this file!

document.addEventListener('DOMContentLoaded', function () {
  const crawlBtn = document.querySelector('#crawlBtn')
  crawlBtn.addEventListener('click', getOpeningCrawl);
  planetBtn = document.querySelector('#findPlanet');
  const planetSelector = document.querySelector('#planetForm');
  planetSelector.addEventListener('submit', getPlanet);
  const droidBtn = document.querySelector('#find-droids');
  droidBtn.addEventListener('click', getDroids)

});

// getOpeningCrawl -✅
// makes a fetch request to https://swapi.co/api/films/1/ ✅
// gets the parsed response ✅
// sets the innerHTML of the crawlDiv element to the opening_crawl attribute of the  parsed response ✅
function getOpeningCrawl() {
  fetch('https://swapi.co/api/films/1/')
    .then(r => r.json())
    .then(d => {
      crawlDiv = document.getElementById("crawlDiv");
      crawlDiv.innerHTML = d.opening_crawl;
    });
}

//getPlanet - ✅
// When a user enters a number in the `#planetInput`, on submit it should call `getPlanet` ✅
// which will fetch that planet 's data from the correct url  ✅
// When the promise resolves, display the name and climate of the planet in the `#planetData` ✅
// Validation -   only the numbers 1 through 60 are valid planet ids, so think about some way of validating the number ✅

function getPlanet(planetForm) {
  planetForm.preventDefault();
  // gets the user input from the #planetInput and convert to integer
  const planetId = parseInt(document.querySelector('#planetInput').value)
  const planetData = document.querySelector('#planetData');

  if (isNaN(planetId) || planetId < 1 || planetId > 60) {
    planetData.innerHTML = 'Please enter a number between 1 and 60'
  } else {
    fetch(`https://swapi.co/api/planets/${planetId}`)
      .then(r => r.json())
      .then(d => {
        planetData.innerHTML = `Planet Name : ${d.name} <br>
                                Planet Climate: ${d.climate}<br>`;
      });
  }
}

// getDroids
// When the page loads, fetch the data for the characters C-3P0 (id: 2) and R2-D2 (id: 3)
// i.e. https://swapi.co/api/people/2 , https://swapi.co/api/people/3 - two fetches, two IDs = > save IDs to an array and iterate
// Show each droid's name, height, and mass in the appropriate spans in the `#droid-2` and `#droid-3` divs

function getDroids() {
  const chosenDroids = [2.3];
  chosenDroids.map(droidID => {
    const droidNameSpan = document.getElementById(`droid-${droidID}-name`);
    const droidHeightSpan = document.getElementById(`droid-${droidID}-height`);
    const droidMassSpan = document.getElementById(`droid-${droidID}-mass`);
    const droidBtn = document.getElementById(`droid-${id}-btn`)
  })
}

// getHomePlanet
function getHomePlanet() {

}
