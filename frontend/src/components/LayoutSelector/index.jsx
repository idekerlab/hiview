import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'

import { MenuItem } from 'material-ui/Menu'
import { FormControl, FormHelperText } from 'material-ui/Form'
import Select from 'material-ui/Select'

import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'

import ApplyIcon from 'material-ui-icons/Refresh'
import FitContent from 'material-ui-icons/ZoomOutMap'
import FitSelected from 'material-ui-icons/CenterFocusStrong'

// Base style
const styles = theme => ({
  root: {
    color: '#333333',
    display: 'inline-flex',
    justifyContent: 'flex-start',
    minWidth: '22em',
    paddingLeft: '1em'
  },
  formControl: {
    minWidth: '15em',
  },
  button: {
    margin: theme.spacing.unit,
    height: '1em'
  },
  icon: {
    fontSize: '2em'
  }
})

const LAYOUTS = {
  PRESET: 'preset',
  COSE: 'cose-bilkent',
  GRID: 'grid',
  CIRCLE: 'circle',
  COCENTRIC: 'concentric',
  BREADTHFIRST: 'breadthfirst'
}

class LayoutSelector extends Component {

  constructor(props) {
    super(props)
    this.state = {
      layout: LAYOUTS.COSE
    }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value })
  }

  handleClick = event => {
    const layoutName = this.state.layout
    this.props.commandActions.applyLayout({
      name: layoutName,
      options: {}
    })
  }

  handleFit = event => {
    this.props.commandActions.fit()
  }

  handleFitSelected = event => {
    console.log('fitSelected:')
    this.props.commandActions.fitSelected()
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <FormControl className={classes.formControl}>
          <Select
            
            value={this.state.layout}
            onChange={this.handleChange('layout')}
          >
            <MenuItem value={LAYOUTS.COSE}>COSE (Force-Directed)</MenuItem>
            <MenuItem value={LAYOUTS.GRID}>Grid</MenuItem>
            <MenuItem value={LAYOUTS.CIRCLE}>Circle</MenuItem>
            <MenuItem value={LAYOUTS.COCENTRIC}>Cocentric</MenuItem>
            <MenuItem value={LAYOUTS.BREADTHFIRST}>Breadthfirst</MenuItem>
          </Select>
          <FormHelperText>Select a layout algorithm</FormHelperText>
        </FormControl>

        <Button
          className={classes.button}
          variant="raised"
          color="primary"
          onClick={this.handleClick}
          size='small'
        >
          <ApplyIcon className={classes.icon} />
        </Button>

        <Button
          className={classes.button}
          variant="raised"
          color="default"
          onClick={this.handleFit}
          size='small'
        >
          <FitContent className={classes.icon} />
        </Button>

        <Button
          className={classes.button}
          variant="raised"
          color="default"
          onClick={this.handleFitSelected}
          size='small'
        >
          <FitSelected className={classes.icon} />
        </Button>
      </div>
    )
  }
}

export default withStyles(styles)(LayoutSelector)
