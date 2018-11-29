const crawlBtn = document.getElementById('crawlBtn')
const crawlDiv = document.getElementById('crawlDiv')
const form = document.getElementById('planetForm')
const textInput = document.getElementById('planetInput')
const planetData = document.getElementById('planetData')
const droid2 = document.getElementById('droid-2')
const droid3 = document.getElementById('droid-3')

document.addEventListener('DOMContentLoaded', () => {


  fetch('https://swapi.co/api/people/2/')
  .then(res => res.json())
  .then(json => {
    droid2.innerHTML = `<p>${json.name}</p>`
  })
  
  fetch('https://swapi.co/api/people/3/')
  .then(res => res.json())
  .then(json => {
    droid3.innerHTML = `<p>${json.name}</p>`
  })

  crawlBtn.addEventListener('click', (event) => {
    fetch('https://swapi.co/api/films/1/')
    .then(res => res.json())
    .then(json => {
      crawlDiv.innerText = json.opening_crawl
    });
  })

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    let userInput = textInput.value
    fetch(`https://swapi.co/api/planets/${userInput}`)
    .then(res => res.json())
    .then(json => {
      planetData.innerHTML = `<div><p>Name: ${json.name}</p><p>Climate: ${json.climate}</p></div>`
    })
  })

})
