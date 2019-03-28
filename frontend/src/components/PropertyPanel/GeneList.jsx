import React from 'react'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import OpenIcon from '@material-ui/icons/OpenInNew'
import IconButton from '@material-ui/core/IconButton'

const GENECARDS_URL = 'http://www.genecards.org/cgi-bin/carddisp.pl?gene='

const GeneList = props => {
  const handleSelect = gene => () => {
    console.log('Gene: ', gene)
    props.externalNetworksActions.setSelectedNodes([gene])
  }

  const handleClick = gene => () => {
    window.open(`${GENECARDS_URL}${gene}`)
  }

  let genes = props.genes
  if (!genes) {
    genes = []
  }

  const sorted = genes.sort()
  console.log('Gene props: ', props)

  return (
    <div style={{ overflow: 'auto' }}>
      <List>
        {sorted.map((gene, i) => (
          <ListItem key={i} onClick={handleSelect(gene)}>
            <IconButton onClick={handleClick(gene)}>
              <OpenIcon />
            </IconButton>
            <ListItemText primary={gene} />
          </ListItem>
        ))}
      </List>
    </div>
  )
}


export default GeneList
