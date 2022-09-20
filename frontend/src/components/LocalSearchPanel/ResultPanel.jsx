import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import classnames from 'classnames'
import { CardContent, CardActions } from '@material-ui/core'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import Divider from '@material-ui/core/Divider'
import SearchResult from './SearchResult'
import NotFoundPanel from './NotFoundPanel'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    top: '0.5em',
    left: '0.5em',
    zIndex: 900,
  },
  legend: {
    width: '100%',
  },
  title: {
    width: '100%',
  },
  card: {
    width: 400,
  },
  expansionCard: {
    marginTop: '0.2em',
    padding: 0,
  },
  expansion: {
    width: '100%',
    padding: 0,
  },
  summaryPanel: {},
  expandPanel: {
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
  },
  heading: {
    fontSize: '0.9em',
    padding: 0,
  },
  media: {
    height: 194,
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  flexGrow: {
    flex: '1 1 auto',
  },
}))

const ResultPanel = ({
  searchMode,
  localSearch,
  commandActions,
  selectionActions,
  currentPath,
  uiState,
}) => {
  const classes = useStyles()
  const {results} = localSearch

  const [expanded, setExpanded] = useState(true)

  useEffect(() => {
    if (results !== null || results.lenght !== 0) {
      setExpanded(true)
    } else {
      setExpanded(false)
    }
  }, [results])

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  if(results === null) {
    return null
  } else if(results.length === 0) {
    return <NotFoundPanel />
  }

  const uniqueResults = new Set(results.map(entry => entry.name.split('.')[0]))

  return (
    <div>
      <Divider />

      <CardActions>
        <Typography variant="h6">
          {`${results.length} matches, ${uniqueResults.size} are unique`}
        </Typography>
        <div className={classes.flexGrow} />
        <IconButton
          className={classnames(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="Show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent style={{ padding: 0 }}>
          <SearchResult
            localSearch={localSearch}
            // search={search}
            commandActions={commandActions}
            selectionActions={selectionActions}
            currentPath={currentPath}
            uiState={uiState}
          />
        </CardContent>
      </Collapse>
    </div>
  )
}

export default ResultPanel
