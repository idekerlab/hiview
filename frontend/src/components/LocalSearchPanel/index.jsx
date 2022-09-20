import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card } from '@material-ui/core'
import red from '@material-ui/core/colors/red'
import MainPanel from './MainPanel'
import ResultPanel from './ResultPanel'

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
  avatar: {
    backgroundColor: red[500],
  },
  flexGrow: {
    flex: '1 1 auto',
  },
}))

const LocalSearchPanel = (props) => {
  const classes = useStyles()
  const { search } = props
  const [showResultPanel, setShowResultPanel] = useState(false)

  const handleShowResult = (showResultPanel) => {
    setShowResultPanel(showResultPanel)
  }

  useEffect(() => {
    if (search.result === null) {
      setShowResultPanel(false)
    } else {
      setShowResultPanel(true)
    }
  }, [search.result])

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <MainPanel {...props} handleShowResult={handleShowResult} />

        {showResultPanel ? (
          <ResultPanel
            searchMode={props.searchMode}
            localSearch={props.localSearch}
            search={props.search}
            commandActions={props.commandActions}
            selectionActions={props.selectionActions}
            currentPath={props.currentPath}
            uiState={props.uiState}
          />
        ) : null}
      </Card>
    </div>
  )
}

export default LocalSearchPanel
