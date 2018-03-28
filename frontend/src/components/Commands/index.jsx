import React, { Component } from 'react'

// Icons
import FitContentIcon from 'material-ui-icons/ZoomOutMap'
import ZoomInIcon from 'material-ui-icons/ZoomIn'
import ZoomOutIcon from 'material-ui-icons/ZoomOut'
import LocateIcon from 'material-ui-icons/MyLocation'
import CloseIcon from 'material-ui-icons/ChevronLeft'
import OpenIcon from 'material-ui-icons/ChevronRight'
import PlotIcon from 'material-ui-icons/Sort'

import Card from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'

import styles from './style.css'

class Commands extends Component {
  handleZoomIn = () => {
    this.props.commandActions.zoomIn()
  }

  handleZoomOut = event => {
    this.props.commandActions.zoomOut()
  }

  handleFit = event => {
    this.props.commandActions.fit()
  }

  handleLocate = event => {
    this.props.commandActions.fit()
  }

  handleShowPlot = event => {
    console.log('Plot: ')
    this.props.uiStateActions.showPlotPanel(true)
  }

  toggle = isOpen => {
    console.log('SHOW: ', isOpen)
    this.props.uiStateActions.showCommands(isOpen)
  }

  render() {
    const uiState = this.props.uiState

    if (!uiState.get('showCommands')) {
      return (
        <Card className={styles.container}>
          <IconButton
            disableRipple={true}
            onClick={e => this.toggle(true)}
            aria-label="Locate selected subsystem"
          >
            <OpenIcon />
          </IconButton>
        </Card>
      )
    }

    return (
      <Card className={styles.container}>
        <IconButton
          disableRipple={true}
          onClick={this.handleZoomIn}
          aria-label="Zoom in"
        >
          <ZoomInIcon />
        </IconButton>
        <IconButton
          disableRipple={true}
          onClick={this.handleZoomOut}
          aria-label="Zoom out"
        >
          <ZoomOutIcon />
        </IconButton>
        <IconButton
          disableRipple={true}
          onClick={this.handleFit}
          aria-label="Fit Content"
        >
          <FitContentIcon />
        </IconButton>

        <div
          style={{
            width: '0.1em',
            height: '1.8em',
            borderLeft: '1px solid #aaaaaa'
          }}
        />


        <IconButton
          disableRipple={true}
          aria-label="Show plot"
          onClick={this.handleShowPlot}
        >
          <PlotIcon
            color={this.plotIconColor()}
          />
        </IconButton>

        <div
          style={{
            width: '0.1em',
            height: '2.5em',
            borderLeft: '2px solid #999999'
          }}
        />

        <IconButton
          disableRipple={true}
          onClick={e => this.toggle(false)}
          aria-label="Locate selected subsystem"
        >
          <CloseIcon />
        </IconButton>
      </Card>
    )
  }

  plotIconColor = () => (
    this.props.uiState.showPlotPanel ? 'primary' : 'inherit'
  )
}

export default Commands
