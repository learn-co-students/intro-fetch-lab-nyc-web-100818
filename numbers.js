// Write your numbers code in this file!

// Number One ✅
// When a user clicks on the button 'Facts About 1': ✅
// fetch a random fact about the number 1 ✅
// Add the fact to the DOM in the `#one-facts` div ✅

//  Pick a Number, Any Number. ✅

// When a user enters a number in the input:
// On Change, fetch a math fact about that number ✅
// Try adding a validation so that a user can 't submit a non-number ✅
// Show it on the screen in the `#random-math-fact` div ✅

// Those who fail to study history are doomed to repeat it
//When the page loads, start an interval:
// Every 5 seconds, fetch a fact about a year and show it on the screen in the `#year-history` div
// Start with this year *
// Every 5 seconds, get the fact about the previous year

// 4.  All the numbers
//  When a user clicks the 'All of the Numbers' button fetch facts for one hundred random numbers append a div to `"#all-the-numbers"` to display all numbers and their fact

document.addEventListener('DOMContentLoaded', function () {
  const oneButton = document.querySelector('#number-one');
  oneButton.addEventListener('click', getOneFactAboutOne);
  const pickANumber = document.querySelector('#pick-a-number');
  pickANumber.addEventListener('change', getAnyNumberTrivia);
  setYearTriviaInterval();
})

function setYearTriviaInterval() {
  let year = new Date().getFullYear(); // gets current year
  showYearTrivia(year);
  setInterval(function () {
    year--
    showYearTrivia(year);

  }, 5000)
}

function showYearTrivia(year) {
  const yearHistory = document.querySelector('#year-history');
  fetch(`http://numbersapi.com/${year}/year`)
    .then(r => r.text())
    .then(parsedYearTrivia => {
      yearHistory.innerHTML = parsedYearTrivia;
    });

}

function getOneFactAboutOne() {
  const oneFacts = document.querySelector('#one-facts');
  fetch('http://numbersapi.com/1/trivia')
    .then(r => r.text())
    .then(function (parsedTrivia) {
      console.log(parsedTrivia);
      oneFacts.innerHTML = parsedTrivia;
    });
}

function getAnyNumberTrivia(triviaForm) {
  triviaForm.preventDefault();
  console.log('Here!')
  const triviaDiv = document.querySelector("#random-math-fact");
  const input = parseInt(document.querySelector("#pick-a-number").value);
  // validation
  if (isNaN(input)) {
    triviaDiv.innerHTML = "Please input a valid number"
  } else {
    fetch(`http://numbersapi.com/${input}/trivia`)
      .then(r => r.text())
      .then(function (parsedTrivia) {
        console.log(parsedTrivia);
        triviaDiv.innerHTML = parsedTrivia;
      });
  }
}
