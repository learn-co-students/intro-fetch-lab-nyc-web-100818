// calls API and returns a promise 
// either text or throw error
const getNumbersApiData = function(number, path) {
  const baseUrl = 'http://numbersapi.com'
  return fetch(`${baseUrl}/${number}/${path}`)
    .then(response => {
      if (response.ok) {
        return response.text()
      } else {
        throw response
      }
    })
    .then(text => {
      return text
    })
}

// calls getNumbersApi function and writes response/error to targetDiv
const getNumFacts = function(num, targetDiv) {
  getNumbersApiData(num, 'trivia')
    .then(text => {
      targetDiv.innerHTML = text
    })
    .catch(response => {
      targetDiv.innerHTML = 'please enter a valid number'
    })
}

// attach event listeners on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function(event) {

  // number one
  const numberOne = document.getElementById('number-one')
  const oneFacts = document.getElementById('one-facts')
  numberOne.addEventListener('click', function(event) {
    getNumFacts(1, oneFacts)
  })

  // pick a number
  const pickANumber = document.getElementById('pick-a-number')
  const randomMathFact = document.getElementById('random-math-fact')
  pickANumber.type = 'number' // only allow numbers!
  pickANumber.addEventListener('change', function(event) {
    const num = event.target.value
    getNumFacts(num, randomMathFact)
  })

  // random math facts
  const allTheNumbers = document.getElementById('all-the-numbers')
  const allNumbersButton = document.getElementById('all-numbers-button')
  allNumbersButton.addEventListener('click', function(event) {
    getRandomNumberFacts(allTheNumbers)
  })
  
  // random year facts
  const yearHistory = document.getElementById('year-history')
  setInterval(() => {
    getNumFacts(2018, yearHistory)
  }, 5000);

})


const getRandomNumberFacts = function(targetDiv) {
  const numUl = document.createElement('ul')
  targetDiv.appendChild(numUl)
  for (let i = 0; i < 100; i++) {
    const num = Math.floor(Math.random() * 1000) // random number between 0 and 9999
    getNumbersApiData(num, 'trivia')
      .then(text => {
        const numLi = document.createElement('li')
        numUl.appendChild(numLi)
        numLi.innerHTML = text
      })
      .catch(response => {
        console.error(response)
      })
  }
}