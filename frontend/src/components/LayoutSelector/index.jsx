import React, {Component} from 'react'
import { withStyles } from 'material-ui/styles';

import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';

import Button from 'material-ui/Button';
import ApplyIcon from 'material-ui-icons/Refresh';

import FitContent from "material-ui-icons/ZoomOutMap";


// Base style
const styles = theme => ({
  root: {
    width: '100%',
    color: '#333333',
    display: 'inline-flex',
    justifyContent: 'flex-end'
  },
  formControl: {
    // margin: theme.spacing.unit,
    width: '50%',
    padding: '1em'
  },
  button: {
    margin: theme.spacing.unit,
    height: '1em'
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
    super(props);
    this.state = {
      layout: LAYOUTS.COSE,
    };
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
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

  render() {
    const { classes } = this.props

    return(
      <div className={classes.root}>

        <FormControl className={classes.formControl}>
          <Select
            value={this.state.layout}
            onChange={this.handleChange('layout')}
            autoWidth
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
          color='primary'
          onClick={this.handleClick}
        >
          Apply
          <ApplyIcon/>
        </Button>

        <Button
          className={classes.button}
          variant="raised"
          color='default'
          onClick={this.handleFit}
        >
          <FitContent/>
        </Button>
      </div>
    )
  }
}

export default withStyles(styles)(LayoutSelector)

