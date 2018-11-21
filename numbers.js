// Write your numbers code in this file!
let thing = ''
let randomArray = []

document.addEventListener('DOMContentLoaded', function() {
  setInterval(delayFacts, 5000)
  function delayFacts () {
    const history = document.getElementById('year-history')
    fetchNumberApi('2017', 'year')
    .then( function(parsedResponse) {
      thing = parsedResponse;
      return history.innerHTML = `
        <ul>
          <li>${parsedResponse}</li>
        </ul>
        `
    })
  }
  //to display random facts about numbers.
  const allNums = document.getElementById('all-numbers-button');
  allNums.addEventListener('click', allTheNumbers)

  const oneButton = document.getElementById('number-one');
  oneButton.addEventListener('click', getNumberOne)

  const anyNumberInput = document.getElementById('pick-a-number')
  anyNumberInput.addEventListener('change', pickANumber)

})

  function fetchNumberApi (num, type) {
    return fetch(`http://numbersapi.com/${num}/${type}`)
    .then(function (responseObject) {
      if (responseObject.ok) {
        return responseObject.text();
      }
      else {
        throw responseObject;
      }
    })
    .catch(function(responseObject) {
      console.warn(responseObject)
    })
  }

  function getNumberOne() {
    event.preventDefault();
    fetchNumberApi('1', 'trivia')
    .then( function(parsedResponse) {
      console.log(parsedResponse)
      thing = parsedResponse;
      oneFacts = document.getElementById("one-facts");
      return oneFacts.innerHTML = `
        <ul>
          <li>${parsedResponse}</li>
        </ul>
        `
    })
  }

  function makeListForHunned() {
    let allFacts = document.getElementById("all-the-numbers")
    let childList = document.createElement("ul")
    childList.id = "all-my-facts"
    allFacts.appendChild(childList);
  }

  function allTheNumbers () {
    let allFacts = document.getElementById("all-the-numbers")
    allFacts.innerHTML = ""
    let childList = document.createElement("ul")
    allFacts.appendChild(childList);
    let randos = createRandomNumbers();
    randos.forEach(function(el) {
      fetchNumberApi(`${el}`, 'trivia')
      .then( function(parsedResponse) {
        thing = parsedResponse;
        let childFact = document.createElement("li")
        childList.append(childFact)
        childFact.innerText = `${parsedResponse}`
      })
    })
  }

  //still need validation #sadface
  function pickANumber (event) {
    fetchNumberApi(`${event.target.value}`, 'trivia')
    .then( function(parsedResponse) {
      console.log(parsedResponse)
      thing = parsedResponse;
      oneFacts = document.getElementById("random-math-fact");
      return oneFacts.innerHTML = `
        <ul>
          <li>${parsedResponse}</li>
        </ul>
        `
    })
  }

  function createRandomNumbers () {
    for (let i = 0; i < 100; i++) {
      let randoNum = Math.floor(Math.random() * 1000) + 1;
      randomArray.push(randoNum);
    }
    return randomArray;
  }

  //this is for testing event handlers my dood
  function thingThang () {
    console.log('hi')
  }
