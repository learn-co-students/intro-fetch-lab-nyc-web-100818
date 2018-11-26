const fetchNumbersApi = function(number, path) {
  const baseUrl = 'http://numbersapi.com'
  return fetch(`${baseUrl}/${number}/${path}`)
  .then(response => {
    if (response.ok) {
      return response.text();
    } else {
      throw response
    }
  })
  .then(text => text)
}

const getNumFacts = function(num, div) {
  fetchNumbersApi(num, 'trivia')
  .then(text => {
  div.innerHTML = text
})
.catch(response => {
  div.innerHTML = 'please enter a valid number'
})
}

const numberOne = document.getElementById('number-one')
const oneFacts = document.getElementById('one-facts')

numberOne.addEventListener('click', function(event) {
  getNumFacts(1, oneFacts)
})

const pickANumber = document.getElementById('pick-a-number')
const randomMathFact = document.getElementById('random-math-fact')
pickANumber.type = 'number'
pickANumber.addEventListener('change', function(event) {
  const num = event.target.value
  getNumFacts(num, randomMathFact)
})
