export const METHOD_POST = 'POST'
export const METHOD_GET = 'GET'

const GO_BASE_URL = 'http://api.geneontology.org/api/bioentity/function/'

const fetchGenes = goTermId => {
  const fetchUrl = GO_BASE_URL + goTermId

  return fetch(fetchUrl, {
    method: METHOD_GET
  })
}

export { fetchGenes }
