// Write your numbers code in this file!
document.addEventListener('DOMContentLoaded', function(event) {

  console.log('Great -- Numbers Content Loaded');

  const factsAboutOnebutton = document.querySelector('#number-one')
  const factDiv = document.querySelector('#one-facts')
  const pickANumberInput = document.querySelector('#pick-a-number')
  const yearHistoryDiv = document.querySelector('#year-history')
  const allNumbersButton = document.querySelector('#all-numbers-button')
  const allNumbersDiv = document.querySelector('#all-the-numbers')
  const mathFactDiv= document.querySelector('#random-math-fact')

  fetchNumbersData = (number) => {
   fetch (`http://numbersapi.com/${number}/trivia`)
    .then(response => response.text())
    .then(text => {
      const dataLi = document.createElement('li')
      dataLi.innerText = text
      const factDiv = document.querySelector('#one-facts')
      factDiv.append(dataLi)
    })
  }
  fetchRandomMathFact = (number) => {
   fetch (`http://numbersapi.com/${number}/trivia`)
    .then(response => response.text())
    .then(text => {
      const dataLi = document.createElement('li')
      dataLi.innerText = text
      const mathFactDiv= document.querySelector('#random-math-fact')
      mathFactDiv.append(dataLi)
    })
  }

  const year = 2018
  setInterval(function() {
    fetch(`http://numbersapi.com/${year}/year`)
    .then(response => response.text())
    .then(text => {
      const dataLi = document.createElement('li')
      dataLi.innerText = text
      const yearHistoryDiv = document.querySelector('#year-history')
      yearHistoryDiv.append(dataLi)    })
    year--}, 5000)
  fetchAllNumbersData = () => {
    fetch (`http://numbersapi.com/1..100`)
    .then(response => response.json())
    .then((json) => {
      var string1 = "";
      for (var property1 in json) {
        string1 += json[property1];
      }
      const dataLi = document.createElement('li')
      dataLi.innerText = string1
      const allNumbersDiv = document.querySelector('#all-the-numbers')
      factDiv.append(dataLi)})
  }


  factsAboutOnebutton.addEventListener('click', function(event) {
    if (event.target.id == factsAboutOnebutton.id ) {
      fetchNumbersData(1);
    }
  })
  pickANumberInput.addEventListener('change', function(event) {
    let x = 1
    let y = 1000
    if (event.target.value < y || event.target.value > x && Number.isInteger(event.target.value) === true ) {
      fetchRandomMathFact(event.target.value)
      console.log(`This is the fact for number ${event.target.value}`);
    } else {
      mathFactDiv.innerText = `${event.target.value} - Error - Please Enter an Integer Between 1 and 1000`
    }
  })
  allNumbersButton.addEventListener('click', function(event) {
    fetchAllNumbersData()
  })


})
