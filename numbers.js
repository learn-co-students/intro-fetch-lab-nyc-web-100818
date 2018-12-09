// Write your numbers code in this file!
//GLOBALS
const url = 'http://numbersapi.com/'
const oneBtn = document.getElementById('number-one')
const userInput = document.getElementById('pick-a-number')
const allNumsBtn = document.getElementById('all-numbers-button')

const fetchFacts = (num) => {
  return fetch(`${url}/${num}/trivia`).then(res => res.text())
}

function numberOne() {
  const oneDiv = document.getElementById('one-facts')
  oneDiv.innerHTML = ''
  fetchFacts(1).then(fact => {
    oneDiv.innerHTML = fact
  })
}

function displayFact(e) {
  e.preventDefault()
  const mathDiv = document.getElementById('random-math-fact')
  mathDiv.innerHTML = ''
  const input = document.getElementById('pick-a-number').value
//validate
  if(isNaN(input)) {
    mathDiv.innerHTML = "I'm sorry, I cannot understand. Please enter a valid number."
  }else {
    fetchFacts(input)
    .then(res => res.text())
    .then(facts => mathDiv.innerHTML = facts)
  }
}

function fetchYearFact(year) {
  return fetch(`${url}/${year}/year`)
  .then(res => res.text())
}

function displayYearFact(year) {
  const yearDiv = document.getElementById('year-history')
  yearDiv.innerHTML = ''
  fetchYearFact(year)
  .then(fact => {
    yearDiv.innerHTML = fact
  })
}

function setYearFactInterval() {
  //start by rendering current yr
  let year = new Date().getFullYear()
  displayYearFact(year)
  setInterval(() => {
    //previous yr
    // !!! can only decrem. if use 'let' not const!
    year--
    //display prev yr fact
    displayYearFact(year)
  }, 5000);
}

function fetchAllNums() {
  return fetch(`${url}/1..100`)
  .then(res => res.json())
}

function renderAllNums() {
  const allDiv = document.getElementById('all-the-numbers')
  allDiv.innerHTML = '' //clear it out
  //fetch 100 facts
  fetchAllNums()
  .then(nums => {
    let ul = '<ul>'
    for(key in nums) {
      ul += `<li>${nums[key]}</li>` 
    }
    ul += '</ul'
    allDiv.innerHTML = ul
  })
}

// DOM + EVENT LISTENERS
document.addEventListener('DOMContentLoaded', () => {
  console.log('%c help im trapped in a loadedd browzr :(', 'color: cyan')
  oneBtn.addEventListener('click', numberOne)
  userInput.addEventListener('change', displayFact)
  setYearFactInterval()
  allNumsBtn.addEventListener('click', renderAllNums)
})