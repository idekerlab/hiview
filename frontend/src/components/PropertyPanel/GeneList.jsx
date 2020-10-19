import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import OpenIcon from '@material-ui/icons/OpenInNew'
import IconButton from '@material-ui/core/IconButton'

const GENECARDS_URL = 'http://www.genecards.org/cgi-bin/carddisp.pl?gene='

const useStyles = makeStyles(theme => ({
  listRoot: {
    margin: 0,
    padding: 0,
    maxHeight: '100%',
    overflow: 'auto',
  },
}))

const GeneList = props => {
  const classes = useStyles()

  const handleSelect = gene => () => {
    props.externalNetworksActions.setSelectedNodes([gene])
  }

  const handleClick = gene => () => {
    window.open(`${GENECARDS_URL}${gene}`)
  }

  let genes = props.genes
  if (!genes) {
    genes = []
  }

  let sorted = genes.sort()

  if (sorted.length > 500) {
    sorted = sorted.slice(0, 500)
    sorted.push('(Showing 500 genes only)')
  }

  return (
    <List className={classes.listRoot}>
      {sorted.map((gene, i) => (
        <ListItem button key={i} onClick={handleSelect(gene)}>
          {gene[0] === '(' ? (
            <div />
          ) : (
            <IconButton onClick={handleClick(gene)}>
              <OpenIcon />
            </IconButton>
          )}
          <ListItemText primary={gene} />
        </ListItem>
      ))}
    </List>
  )
}

export default GeneList
