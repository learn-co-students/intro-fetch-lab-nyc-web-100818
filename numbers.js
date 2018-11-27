const factDiv = document.getElementById('one-facts')
const numberField = document.getElementById('pick-a-number')
const randomFactDiv = document.getElementById('random-math-fact')
const yearDiv = document.getElementById('year-history')

document.addEventListener('DOMContentLoaded', (event) => {

  var year = 2018

  setInterval(function() {
    fetch(`http://numbersapi.com/${year}/year`)
    .then(response => response.text())
    .then(text => {
      yearDiv.innerText = text
    })
    year--
  }, 5000)

  function numberFetch(num) {
    return fetch(`http://numbersapi.com/${num}/trivia`)
    .then(response => response.text())
  }

  document.addEventListener('click', (event) => {
    if (event.target.id == "number-one") {
      numberFetch(1)
      .then(text => {
        factDiv.innerText = text;
      })
    }
  })

  function timeOutAppend(num) {
    return numberFetch(num)
           .then(text => {
           randomFactDiv.innerText = text;
           })
  }

  numberField.addEventListener('change', () => {
    timeOutAppend(numberField.value)
  })

  const allTheNumbers = document.getElementById('all-the-numbers')
  const allNumbersButton = document.getElementById('all-numbers-button')
  allNumbersButton.addEventListener('click', function(event) {
    getRandomNumberFacts(allTheNumbers)
  })

  const getRandomNumberFacts = function(targetDiv) {
  const numUl = document.createElement('ul')
  targetDiv.appendChild(numUl)
  for (let i = 0; i < 100; i++) {
    const num = Math.floor(Math.random() * 1000) // random number between 0 and 9999
    numberFetch(num)
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

})
