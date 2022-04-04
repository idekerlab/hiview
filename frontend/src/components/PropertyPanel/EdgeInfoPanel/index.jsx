import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ListSubheader from '@material-ui/core/ListSubheader'
import List from '@material-ui/core/List'

import { Typography } from '@material-ui/core'
import { parseProps } from '../../../utils/edge-prop-util'
import EvidenceListItem from './EvidenceListItem'

// This is the special key value for encoded string
export const NDEX_EVIDENCE_KEY = 'ndex:evidence'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    minHeight: '10em',
    backgroundColor: theme.palette.background.default,
  },
  subtitle: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(6),
  },
}))

const EdgeInfoPanel = ({ selectedEdge }) => {
  const classes = useStyles()
  const [listData, setListData] = useState([])

  useEffect(() => {
    if (selectedEdge === null || selectedEdge === undefined) {
      setListData(null)
      return
    }

    const { edge } = selectedEdge
    const evidence = edge[NDEX_EVIDENCE_KEY]
    const evidences = evidence.map((ev) => parseProps(ev))

    setListData(evidences)
  }, [selectedEdge])

  if (
    listData === null ||
    listData === undefined ||
    listData.length === 0 ||
    selectedEdge === undefined ||
    selectedEdge === null
  ) {
    return null
  }

  return (
    <List
      component="nav"
      aria-labelledby="nested-edge-property-list"
      subheader={
        <ListSubheader
          className={classes.subtitle}
          component="div"
          id="nested-list-subheader"
        >
          <Typography
            variant="subtitle1"
            className={classes.inline}
            color="textPrimary"
          >
            {`Selected evidence: ${selectedEdge.source} - ${selectedEdge.target}`}
          </Typography>
        </ListSubheader>
      }
      className={classes.root}
    >
      {listData.map((entry, idx) => (
        <EvidenceListItem key={`evidence-${idx}`} evidence={entry} />
      ))}
    </List>
  )
}

export default EdgeInfoPanel
