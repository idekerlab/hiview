export const METHOD_POST = 'POST'
export const METHOD_GET = 'GET'

const GO_SEARCH_URL = 'https://www.ebi.ac.uk/QuickGO/services/annotation/search'

const CATEGORIES = {
  BP: 'biological_process',
  CC: 'cellular_component',
  MF: 'molecular_function'
}

const searchGenes = (goTermId, category = 'BP', taxonId = '9606') => {
  const url = new URL(GO_SEARCH_URL)

  url.searchParams.set('goId', goTermId)
  url.searchParams.set('aspect', CATEGORIES[category])
  url.searchParams.set('taxonId', taxonId)

  url.searchParams.set('taxonUsage', 'exact')
  url.searchParams.set('limit', '100')


  console.log("Calling GO API:", url)
  
  return fetch(url, {
    method: METHOD_GET
  })
}

export { searchGenes }
