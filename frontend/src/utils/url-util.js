const HTTPS = 'https://'

const getBaseUrl = ({ serverType, uuid }) =>
  `${HTTPS}${serverType}.ndexbio.org/v2/network/${uuid}`

export const getNdexNetworkSummaryUrl = ({ serverType, uuid }) => 
  `${getBaseUrl({ serverType, uuid })}/summary`

export const getNdexNetworkUrl = ({ serverType, uuid }) => getBaseUrl({ serverType, uuid })

export const getNdexFilterUrl = ({ serverType, uuid, limit = 10000 }) =>
  `${HTTPS}${serverType}.ndexbio.org/edgefilter/v1/network/${uuid}/topNEdgeFilter?limit=${limit}`
