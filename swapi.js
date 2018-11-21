// // Write your swapi code in this file!
//
//
//
// function fetchSwapi(type, num) {
//   return fetch(`https://swapi.co/api/${type}/${num}`).then(res => res.json())
// }
//
//
// function getOpeningCrawl() {
//   fetchSwapi('films', 1)
//   .then(d => {
//     crawlDiv = document.getElementById("crawlDiv");
//     crawlDiv.innerText = d.opening_crawl;
//   });
// };
//
// document.addEventListener('DOMContentLoaded', function() {
//   const crawlButton = document.querySelector('#crawlBtn')
//   crawlButton.addEventListener('click', getOpeningCrawl)
//   const planetSelector = document.querySelector('#planetForm')
//   planetSelector.addEventListener('submit', getPlanet)
//   const droidBtn = document.querySelector("#find-droids")
//   droidBtn.addEventListener('click', getDroids)
// })
