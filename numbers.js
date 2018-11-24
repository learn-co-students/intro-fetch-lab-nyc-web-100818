// Write your numbers code in this file!
const baseUrl = 'http://numbersapi.com/'

const numberOne = document.getElementById('number-one');
const oneFacts = document.getElementById('one-facts');

const randomNumberInput = document.getElementById('pick-a-number');
const randomMathFact = document.getElementById('random-math-fact');

const yearHistory = document.getElementById('year-history');

const allNumbersButton = document.getElementById('all-numbers-button');

const allNumbersField = document.getElementById('all-the-numbers');

function fetchAPIData(...args) {
  let requestParamsString = args.join("/")
  // console.log(`${baseUrl}${requestParamsString}`);
  //idk why tests are not passing
  
  return fetch(`${baseUrl}/${requestParamsString}`)
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

function fetchNumberFact(number) {
  fetchAPIData( number, 'trivia')
    .then(text => {
    oneFacts.innerHTML = text;
  })
  .catch(response => {
    oneFacts.innerHTML = 'enter a valid number'
  })
}

function showHundredFacts() {
  const numList = document.createElement('ul');
  allNumbersField.appendChild(numList);

  for (let i = 0; i < 100; i++) {
    const num = Math.floor(Math.random() * 1000) 
    fetchAPIData(num, 'trivia')
      .then(text => {
        const listItem = document.createElement('li')
        numList.appendChild(listItem)
        listItem.innerHTML = text
      })
      .catch(response => {
        console.error(response)
      })
  }
}

function numberValidate(str) {
  num = parseFloat(str);
  return (!isNaN(num) && str.length > 0);
}


document.addEventListener('DOMContentLoaded', function() { 
  numberOne.addEventListener('click', function() {
    fetchNumberFact(1);
  });

  allNumbersButton.addEventListener('click', function() {
    showHundredFacts();
  });

  randomNumberInput.addEventListener('input', function(event) {
    let eventInput = event.target.value;
    if(numberValidate(eventInput)) {
      fetchAPIData( eventInput, 'math')
        .then(text => {
          console.log(text)
          randomMathFact.innerHTML = text
        })
        .catch(response => {
          targetDiv.innerHTML = 'please enter a valid number'
        }) //two ways of handling errors... either write custom validation or use catch... i wrote validation function because it makes sense to check user input before sending out requests and doing all the other logic 
    }
    else {
      randomMathFact.innerHTML = 'enter a number'
    }
  })

  setInterval(() => {
    fetchAPIData("random", "year")
      .then(text => {
        yearHistory.innerHTML = text
      });
  }, 5000);
});


