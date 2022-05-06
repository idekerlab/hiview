import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import classnames from 'classnames'
import {Card, CardContent, CardActions, Tooltip} from '@material-ui/core'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import red from '@material-ui/core/colors/red'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'

import Divider from '@material-ui/core/Divider'
import SearchResult from './SearchResult'

import MainPanel from './MainPanel'
import NotFoundPanel from './NotFoundPanel'

import Overlay from '../Overlay'

const styles = theme => ({
  root: {
    position: 'fixed',
    top: '0.5em',
    left: '0.5em',
    zIndex: 900
  },
  legend: {
    width: '100%'
  },
  title: {
    width: '100%'
  },
  card: {
    width: 400
  },
  expansionCard: {
    marginTop: '0.2em',
    padding: 0
  },
  expansion: {
    width: '100%',
    padding: 0
  },
  summaryPanel: {},
  expandPanel: {
    display: 'flex',
    flexDirection: 'column',
    padding: 0
  },
  heading: {
    fontSize: '0.9em',
    padding: 0
  },
  media: {
    height: 194
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  },
  flexGrow: {
    flex: '1 1 auto'
  },
})

class LocalSearchPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: '',
      expanded: false,
      showResultPanel: false,
      id2label: {}
    }
  }

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded })
  }

  handleShowResult = showResultPanel => {
    this.setState({
      showResultPanel
    })
  }

  componentWillReceiveProps(nextProps) {
    const nextResult = nextProps.localSearch.results
    const currentResult = this.props.localSearch.results

    if (nextResult === currentResult) {
      return
    }

    if (nextResult !== undefined && nextResult !== null) {
      if (nextResult.length !== 0) {
        this.setState({ expanded: true })
      } else {
        this.setState({ expanded: false })
      }
    } else {
      this.setState({ expanded: false })
    }

    const uuid = this.props.routeParams.uuid
    const networkKey = Object.keys(nextProps.network)

    let networkData = null
    let currentNetworkUrl = null

    networkKey.forEach(key => {
      if (key.includes(uuid)) {
        networkData = nextProps.network[key]
        currentNetworkUrl = key
      }
    })

    if (networkData !== null) {
      this.setState({ currentNetworkUrl: currentNetworkUrl })
    }
  }

  render() {
    const { classes, network } = this.props

    let label = 'N/A'
    let dagHeight = 0
    if (network !== undefined && network !== null) {
      const { title, hierarchy } = network

      label = title
      if (hierarchy !== undefined && hierarchy !== null) {
        dagHeight = hierarchy.height
      }
    }

    let rootId = null

    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <MainPanel {...this.props} handleShowResult={this.handleShowResult} />

          {this.state.showResultPanel ? (
            this.getResultPanel(classes, rootId)
          ) : (
            <div />
          )}
        </Card>
        <Card className={classes.expansionCard}>
          <ExpansionPanel defaultExpanded={false} className={classes.expansion}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              className={classes.summaryPanel}
            >
              <Typography className={classes.heading}>
                {label}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.expandPanel}>
              <Divider />
              <div className={classes.title}>
                <Overlay {...this.props} />
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Card>
      </div>
    )
  }

  getResultPanel = (classes, rootId) => {
    const results = this.props.localSearch.results
    const searchMode = this.props.uiState.get('searchMode')

    if (results === undefined || results.length === 0) {
      return <NotFoundPanel />
    } else {
      return (
        <div>
          <Divider />

          <CardActions>
            <Typography variant="h6">
              {'Search Result (' + searchMode + ' matches)'}
            </Typography>
            <div className={classes.flexGrow} />
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent style={{ padding: 0 }}>
              <SearchResult
                localSearch={this.props.localSearch}
                search={this.props.search}
                commandActions={this.props.commandActions}
                selectionActions={this.props.selectionActions}
                rootId={rootId}
                currentPath={this.props.currentPath}
                uiState={this.props.uiState}
              />
            </CardContent>
          </Collapse>
        </div>
      )
    }
  }
}

LocalSearchPanel.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(LocalSearchPanel)
