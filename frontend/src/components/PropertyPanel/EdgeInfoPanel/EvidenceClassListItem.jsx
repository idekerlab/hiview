import React, { useState, useEffect } from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import ExpandLess from '@material-ui/icons/ArrowDropDown'
import ExpandMore from '@material-ui/icons/ArrowRight'
import Collapse from '@material-ui/core/Collapse'

import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'

import DOMPurify from 'dompurify'
import parse from 'html-react-parser'

import { Typography } from '@material-ui/core'
import PathNetworkPanel from './PathNetworkPanel'
import EvidenceListItem from './EvidenceListItem'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    minHeight: '10em',
    backgroundColor: theme.palette.background.paper,
  },
  item: {
    borderTop: '1px solid #bbbbbb',
    height: '3.5em',
  },
  inline: {
    height: '1.2em',
  },
  item2: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    paddingLeft: theme.spacing(1),
  },
  nested: {
    paddingLeft: theme.spacing(7),
  },
}))

const EvidenceClassListItem = ({
  edgeClass,
  evidenceList,
  selectedEdge,
  queryPaths,
}) => {
  const classes = useStyles()

  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <React.Fragment>
      <ListItem className={classes.item} button onClick={handleClick}>
        {open ? <ExpandLess /> : <ExpandMore />}
        <div className={classes.item2}>
          <Typography variant="h5" color="textPrimary">
            {edgeClass}
          </Typography>
        </div>
        <div>
          <ListItemText>
            <Typography
              variant="h6"
              className={classes.inline}
              color="textPrimary"
            >
              {`SHAP Score Total: ${evidenceList
                .map((evidence) => evidence.shap)
                .reduce((a, b) => a + b, 0)}`}
            </Typography>
          </ListItemText>
        </div>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List dense component="div" disablePadding>
          {evidenceList.map((entry, idx) => {
            return (
              <EvidenceListItem
                className={classes.nested}
                selectedEdge={selectedEdge}
                key={`evidence-${idx}`}
                evidence={entry}
                queryPaths={queryPaths}
              />
            )
          })}
        </List>
      </Collapse>
    </React.Fragment>
  )
}

export default EvidenceClassListItem
