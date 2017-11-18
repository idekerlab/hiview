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


// Base style
const styles = theme => ({
  root: {
    width: '100%',
    height: '3em',
    color: '#333333'
  },
  formControl: {
    margin: theme.spacing.unit,
  },
})


const LAYOUTS = {
  PRESET: 'preset',
  COSE: 'cose',
  GRID: 'grid'
}


class LayoutSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layout: LAYOUTS.COSE,
    };
  }

  render() {
    const { classes } = this.props

    return(
      <div className={classes.root}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-simple">Layout Algorithm</InputLabel>
          <Select
            value={this.state.layout}
            autoWidth
          >
            <MenuItem value={10}>COSE</MenuItem>
            <MenuItem value={20}>Circular</MenuItem>
            <MenuItem value={30}>Cocentric</MenuItem>
            <MenuItem value={40}>Preset</MenuItem>
          </Select>
          <FormHelperText>Auto width</FormHelperText>
        </FormControl>
      </div>
    )
  }
}

export default withStyles(styles)(LayoutSelector)

