// Write your swapi code in this file!
const planetData = document.getElementById('planetData')
const crawlDiv = document.getElementById('crawlDiv')

const getApiData = function(url) {
  // return the promise json
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw response
      }
    })
    .then(json => {
      return json
    })
    .catch(response => {
      console.error(response)
    })
}

const crawlThatText = function(text, targetDiv) {
  targetDiv.innerHTML = "" // reset that div
  let timeOffset = 0;
  for (let i = 0; i < text.length; i++) {
    setTimeout(function() {
      targetDiv.innerHTML += text[i];
    }, timeOffset);
    timeOffset += 100;
    if (text[i] === ".")
      timeOffset += 500
  }
}

const getDroids = function() {
  const droidIds = [2,3]
  droidIds.forEach(getDroid)
}

const makeDroidButton = function(id) {
  const droidButton = document.createElement('button')
  droidButton.id = `droid-${id}-btn`
  droidButton.innerText = "Get Homeworld Info"
  return droidButton
}

const getDroid = function(id) {
  const url = `https://swapi.co/api/people/${id}/`
  getApiData(url)
    .then((json) => {
      const droidDiv = document.getElementById(`droid-${id}`)
      droidDiv.innerHTML = 
        `<span>Name: ${json.name}</span><br>
        <span>Height: ${json.height}</span><br>
        <span>Mass: ${json.mass}</span><br>
        `
      droidButton = makeDroidButton(id)
      droidButton.dataset.droidId = id
      droidButton.dataset.homeworldId = json.homeworld.split("/").slice(-2, -1)
      droidButton.addEventListener('click', function() {
        const planetId = event.target.dataset.homeworldId
        const droidId = event.target.dataset.droidId
        getHomePlanet(planetId, droidId)
      })
      droidDiv.appendChild(droidButton)
    })
}

const getOpeningCrawl = function() {
  const url = 'https://swapi.co/api/films/4/'
  getApiData(url)
    .then((json) => {
      crawlThatText(json.opening_crawl, crawlDiv)
    })
}

const getHomePlanet = function(planetId, droidId) {
  const url = `https://swapi.co/api/planets/${planetId}/`
  getApiData(url)
    .then((json) => {
      const droidDiv = document.getElementById(`droid-${droidId}`)
      const droidInfo = document.createElement('span')
      droidInfo.innerHTML = `Name: ${json.name}<br>Climate: ${json.climate}`
      droidDiv.appendChild(droidInfo)
    })
}

const getPlanet = function(id) {
  const url = `https://swapi.co/api/planets/${id}/`
  getApiData(url)
    .then((json) => {
      planetData.innerHTML = `Name: ${json.name}<br>Climate: ${json.climate}`
    })
}

// javascript will run after DOM loaded because js is at bottom of page
document.getElementById('crawlBtn').addEventListener('click', getOpeningCrawl)

document.getElementById('planetForm').addEventListener('submit', function(event) {
  const id = event.target.querySelector('#planetInput').value
  getPlanet(id)
})

getDroids()