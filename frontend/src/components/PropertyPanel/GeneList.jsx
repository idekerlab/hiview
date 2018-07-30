import React from 'react'

import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import OpenIcon from 'material-ui-icons/OpenInNew'

const GENECARDS_URL = 'http://www.genecards.org/cgi-bin/carddisp.pl?gene='

const GeneList = props => {
  let genes = props.genes
  if (!genes) {
    genes = []
  }

  return (
    <div style={{ overflow: 'auto' }}>
      <List>
        {genes.map((gene, i) => (
          <ListItem button onClick={handleClick(gene)} key={i}>
            <ListItemIcon>
              <OpenIcon />
            </ListItemIcon>
            <ListItemText primary={gene} />
          </ListItem>
        ))}
      </List>
    </div>
  )
}

const handleClick = gene => () => {
  window.open(`${GENECARDS_URL}${gene}`)
}

export default GeneList
