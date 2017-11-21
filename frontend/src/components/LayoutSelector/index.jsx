import React, {Component} from 'react'

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import green from 'material-ui/colors/green';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import CommentIcon from 'material-ui-icons/Comment';
import ListSubheader from 'material-ui/List/ListSubheader';

import deepOrange from 'material-ui/colors/deepOrange';
import Avatar from 'material-ui/Avatar'

import * as d3ScaleChromatic from 'd3-scale-chromatic'
import * as d3Scale from 'd3-scale'

import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';


import Button from 'material-ui/Button';
import ApplyIcon from 'material-ui-icons/Refresh';



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
            <MenuItem value={LAYOUTS.COSE}>COSE (Force-Directed Layout)</MenuItem>
            <MenuItem value={LAYOUTS.GRID}>Grid</MenuItem>
            <MenuItem value={LAYOUTS.CIRCLE}>Circle</MenuItem>
            <MenuItem value={LAYOUTS.COCENTRIC}>Cocentric</MenuItem>
            <MenuItem value={LAYOUTS.BREADTHFIRST}>Breadthfirst</MenuItem>
          </Select>
          <FormHelperText>Select a layout algorithm</FormHelperText>
        </FormControl>

        <Button
          className={classes.button}
          raised
          color='primary'
          onClick={this.handleClick}
        >
          Apply
          <ApplyIcon/>
        </Button>
      </div>
    )
  }
}

export default withStyles(styles)(LayoutSelector)

