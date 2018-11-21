// Write your numbers code in this file!
// http://numbersapi.com/23/trivia?fragment <- Numbers API for 1

const numberOneButton = document.getElementById('number-one')
numberOneButton.addEventListener('click', randomOneFact)

function randomOneFact() {
  const oneFacts = document.getElementById('one-facts')
  fetch('http://numbersapi.com/1/trivia')
    .then((response) => {
      let parsedResponse = response.text()
      return parsedResponse
    })
    .then((parsedResponse) => {
      oneFacts.innerHTML += `${parsedResponse}` + `<br>`
    })
}

const pickANumber = document.getElementById('pick-a-number')
pickANumber.addEventListener('change', randomNumFact)

function randomNumFact() {
  console.log(`%cnum submitted: ${pickANumber.value}`, 'color: blue')
  const randomMathFact = document.getElementById('random-math-fact')
  fetch(`http://numbersapi.com/${pickANumber.value}/math`)
    .then((response) => {
      return response.text()
    })
    .then((parsedResponse) => {
      randomMathFact.innerHTML += `${parsedResponse}` + `<br>`
    })
}

let currentYear = 2018

function repeatHistory(year) {
  console.log(`%crepeat history: ${year}`, 'color: red')
  const yearHistory = document.getElementById('year-history')

  fetch(`http://numbersapi.com/${year}/year`)
    .then((response) => {
      return response.text()
    })
    .then((parsedResponse) => {
      yearHistory.innerHTML += `${parsedResponse}` + `<br>`
    }).then((response) =>{
      currentYear -= 1
      setTimeout(() => { repeatHistory(currentYear) }, 10000)
    })
}

repeatHistory(currentYear)
