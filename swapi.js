const crawlDiv = document.getElementById('crawlDiv')

const getOpeningCrawl = () => {
  fetch('https://swapi.co/api/films/1/')
    .then((response) => {
      console.log(`response is:`, response)
      const parsedResponse = response.json()
      console.log(`parsedResponse is:`, parsedResponse)
      return parsedResponse
    })
    .then((parsedResponse) => {
      const crawl = parsedResponse['opening_crawl']
      console.log(`opening crawl is:`, crawl)
      crawlDiv.innerHTML += `<p>${crawl}</p>`
    })
}
