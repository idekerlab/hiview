import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import classnames from 'classnames'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import red from '@material-ui/core/colors/red'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import Divider from '@material-ui/core/Divider'
import SearchResult from './SearchResult'

import MainPanel from './MainPanel'
import NotFoundPanel from './NotFoundPanel'

const styles = theme => ({
  card: {
    width: 360
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
  }
})

class SearchPanel extends Component {
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
    const { classes } = this.props

    let rootId = null

    return (
      <Card className={classes.card}>
        <MainPanel {...this.props} handleShowResult={this.handleShowResult} />

        {this.state.showResultPanel ? (
          this.getResultPanel(classes, rootId)
        ) : (
          <div />
        )}
      </Card>
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

SearchPanel.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SearchPanel)
