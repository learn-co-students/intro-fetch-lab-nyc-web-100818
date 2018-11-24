// Write your swapi code in this file!
const crawlBtn = document.getElementById('crawlBtn');
const form = document.getElementById('planetForm');
const planetData = document.getElementById('planetData');

document.addEventListener('DOMContentLoaded', function() {
  function fetchSwapi(type, num) {
    return fetch(`https://swapi.co/api/${type}/${num}`).then(res => res.json())
  }

  function planetsRequest(id) {
    let url =  `https://swapi.co/api/planets/${id}/`
    return fetch(url)
      .then(res => res.json())
      .then(d => {
        console.log(d)
        planetData.innerHTML = `${d.name}: ${d.climate}`;
      })
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    let id = event.target.querySelector('#planetInput').value
    if(!validate(id, 1, 60)) {
      planetData.innerHTML = "please enter value between 1 and 60";
    }
    else {
      planetsRequest(id);
    }
  });
  
  function getOpeningCrawl() {
    fetchSwapi('films', 1)
    .then(d => {
      crawlDiv = document.getElementById("crawlDiv");
      crawlDiv.innerText = d.opening_crawl;
    });
  };

  crawlBtn.addEventListener('click', function() {
    getOpeningCrawl();
  });
});

function validate(str, min, max) {
  n = parseFloat(str);
  return (str.length > 0 && !isNaN(n) && n >= min && n <= max);
}
