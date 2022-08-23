import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ListSubheader from '@material-ui/core/ListSubheader'
import List from '@material-ui/core/List'

import { Typography } from '@material-ui/core'
import { parseProps, convertProps } from '../../../utils/edge-prop-util'
import EvidenceClassListItem from './EvidenceClassListItem'

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

const EdgeInfoPanel = ({
  selectedEdge,
  network,
  queryPathsActions,
  queryPaths,
}) => {
  const classes = useStyles()
  const [listData, setListData] = useState([])

  useEffect(() => {
    if (selectedEdge === null || selectedEdge === undefined) {
      setListData(null)
      return
    }

    const { edge } = selectedEdge
    if (edge === undefined || edge === null) {
      setListData(null)
      return
    }
    const evidence = edge[NDEX_EVIDENCE_KEY]
    if (
      evidence === undefined ||
      evidence === null ||
      !Array.isArray(evidence)
    ) {
      setListData(null)
      return
    }

    const evidences = evidence.map((ev) => parseProps(ev))
    const nestedList = convertProps(evidences)

    setListData(nestedList)
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
      dense={true}
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
      {Object.keys(listData).map((key, idx) => {
        const entry = listData[key]
        return (
          <EvidenceClassListItem
            edgeClass={key}
            selectedEdge={selectedEdge}
            key={`evidence-${idx}`}
            evidenceList={entry}
            queryPaths={queryPaths}
          />
        )
      })}
    </List>
  )
}

export default EdgeInfoPanel
