// Write your swapi code in this file!


//fetchSwapi - takes in two arguments type and id. Abstracting out the functionality of the fetch request to the SWAPI api

function fetchSwapi(type, id) {
  return fetch(`https://swapi.co/api/${type}/${id}`).then(function (response) {
    return response.json();
  });
}

//When the user clicks the button "Get Opening Crawl", it should trigger the function getOpeningCrawl which should fetch the data from the correct URL NOTE => type = 'films', id = 1, attribute opening_crawl
//When the promise is resolved, the 'opening crawl' should appear on the page in the #crawlDiv element

function getOpeningCrawl() {
  fetchSwapi('films', 1) // call fetch and pass in films and 1 as arguments => returns Promise object
    .then(data => {
      crawlDiv = document.querySelector('#crawlDiv');
      crawlDiv.innerText = data.opening_crawl;
    });
}


//When a user enters a number in the# planetInput, on submit it should call getPlanet
// getPlanet which will fetch that planet 's data from the correct url
// When the promise resolves, display the name and climate of the planet in the# planetData
// only the numbers 1 through 60 are valid planet ids, so think about some way of validating the number
function getPlanet(event) {
  event.preventDefault();
  const planetId = parseInt(document.querySelector('#planetInput').value);
  const planetData = document.getElementById('planetData');
  //validation , must be a number and between and 60
  if (isNaN(planetId) || planetId < 1 || planetId > 60) {
    planetData.innerHTML = "please enter a number between 1 and 60"
  } else {
    // once promise is resolved set the innerHTML of the planetData element to the name of the planet and the climate
    fetchSwapi('planets', planetId)
      .then(data => {
        planetData.innerHTML = `<p>Name: ${data.name}</p> <p>Climate: ${data.climate}`;
      });
  }
}

function getHomePlanet(planetData, id) {
  console.log(`about to fetch data for planet ${planetData}`);
  fetch(planetData)
    .then(data => data.json())
    .then(planet => {
      document.getElementById(`droid-${id}-homeworld`).innerText = planet.name;
    });
}

function getDroids() {
  const droidIDs = [2, 3] // setup for iteration

  droidIDs.map(id => {
    const droidNameSpan = document.getElementById(`droid-${id}-name`);
    const droidHeightSpan = document.getElementById(`droid-${id}-height`);
    const droidMassSpan = document.getElementById(`droid-${id}-mass`);
    const droidButton = document.getElementById(`droid-${id}-btn`);
    fetchSwapi("people", id)
      .then(droid => {
        droidNameSpan.innerText = droid.name;
        droidHeightSpan.innerText = droid.height;
        droidMassSpan.innerText = droid.mass;
        droidButton.addEventListener('click', () => getHomePlanet(droid.homeworld, id))
      });
  });
}


// Event listener for 'DOMContentLoaded', attach event listeners to our buttons/forms passing in our fetch functions

document.addEventListener('DOMContentLoaded', function () {
  const crawlButton = document.querySelector('#crawlBtn');
  crawlButton.addEventListener('click', getOpeningCrawl);
  const planetSelector = document.querySelector('#planetForm');
  planetForm.addEventListener('submit', getPlanet);
  const droidButton = document.querySelector("#find-droids");
  droidButton.addEventListener('click', getDroids);
});


// ===============================================================================================================================
// Learn. co Version
// function fetchSwapi(type, num) {
//   return fetch(`https://swapi.co/api/${type}/${num}`).then(res => res.json())
// }


// function getOpeningCrawl() {
//   fetchSwapi('films', 1)
//     .then(d => {
//       crawlDiv = document.getElementById("crawlDiv");
//       crawlDiv.innerText = d.opening_crawl;
//     });
// };


// function getPlanet(e) {
//   e.preventDefault()
//   const planetId = parseInt(document.querySelector('#planetInput').value)
//   const planetData = document.getElementById('planetData')
//   if (isNaN(planetId) || planetId < 1 || planetId > 60) {
//     planetData.innerHTML = "please enter a number between 1 and 60"
//   } else {
//     fetchSwapi('planets', planetId)
//       .then(d => {
//         planetData.innerHTML = `<p>Name: ${d.name}</p> <p>Climate: ${d.climate}`
//       })
//   }
// }

// function getHomePlanet(planetData, id) {
//   console.log(`about to fetch data for planet ${planetData}`);
//   fetch(planetData)
//     .then(r => r.json())
//     .then(planet => {
//       document.getElementById(`droid-${id}-homeworld`).innerText = planet.name
//     })
// }

// function getDroids() {
//   const droidIDs = [2, 3]
//   droidIDs.map(id => {
//     const droidNameSpan = document.getElementById(`droid-${id}-name`)
//     const droidHeightSpan = document.getElementById(`droid-${id}-height`)
//     const droidMassSpan = document.getElementById(`droid-${id}-mass`)
//     const droidBtn = document.getElementById(`droid-${id}-btn`)
//     fetchSwapi("people", id)
//       .then(droid => {
//         droidNameSpan.innerText = droid.name
//         droidHeightSpan.innerText = droid.height
//         droidMassSpan.innerText = droid.mass
//         droidBtn.addEventListener('click', () => getHomePlanet(droid.homeworld, id))
//       })
//   })
// }

// document.addEventListener('DOMContentLoaded', function () {
//   const crawlButton = document.querySelector('#crawlBtn')
//   crawlButton.addEventListener('click', getOpeningCrawl)
//   const planetSelector = document.querySelector('#planetForm')
//   planetSelector.addEventListener('submit', getPlanet)
//   const droidBtn = document.querySelector("#find-droids")
//   droidBtn.addEventListener('click', getDroids)
// })
