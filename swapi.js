// Write your swapi code in this file!
// event listeners

  const crawlButton = document.querySelector('#crawlBtn');
  

  const planetForm = document.getElementById('planetForm')

  const planetBtn = document.getElementById('findPlanet')


  const droidIds = [2, 3]


function fetchSwapi(type, id, options) {
  return fetch(`https://swapi.co/api/${type}/${id}`).then(res => res.json())
}

const getOpeningCrawl = () => {
  fetchSwapi('films', 1)
  .then(data => {
    const crawlDiv = document.getElementById('crawlDiv')
    crawlDiv.textContent = data.opening_crawl
  })
}

const getPlanet = (e) => {
  e.preventDefault()
  //get input from field
  const pId = parseInt(document.querySelector('#planetInput').value)
  const planetDiv = document.getElementById('planetData')

 

  //validate planet ids
  if(isNaN(pId) || pId < 1 || pId > 60){
    planetDiv.textContent = "Please enter a number between 1-60: "
  }else{
    //fetch correct data from api
    fetchSwapi('planets', pId)
    .then(data => {
      planetDiv.innerHTML = `
      <u><b>Planet</b></u>: ${data.name}
      <u><b>Climate</b></u>: ${data.climate}
      `
   }) 
  }
}


const addHTML = (id) => {
    const droidDiv = document.getElementById(`droid-${id}`)
    droidDiv.innerHTML +=
    `
<span id='name'></span>
<span id='height'>}</span>
<span id='mass'></span>
<button id='droidBtn'></button>
`
  
}

const renderDroids = () => {
  const nameSpan = document.getElementById('name')
  const heightSpan = document.getElementById('height')
  const massSpan = document.getElementById('mass')
  fetchSwapi('people', id)
  .then(droid => {
    nameSpan.innerText = droid.name
    heightSpan.innerText = droid.height
    massSpan.innerText = droid.text
  })
}


const getHomePlanet = (planetData, id) => {
fetch(planetData)
.then(r => r.json())
.then(planet => document.getElementById(`droid-${id}-homeworld`).innerText = planet.name)
}
const droidBtn = document.querySelector("#droidBtn");
const getDroids = () => {

  const droidIds = [2, 3]
  droidIds.map(id => renderDroids(id))
  droidBtn.addEventListener('click', () => getHomePlanet(droid.homeworld, id))
}

crawlButton.addEventListener('click', getOpeningCrawl)
planetBtn.addEventListener('submit', getPlanet)
droidBtn.addEventListener('click', getDroids)

