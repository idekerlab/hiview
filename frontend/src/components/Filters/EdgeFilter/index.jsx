import React, {Component} from 'react'

import Slider, {createSliderWithTooltip} from 'rc-slider'
import 'rc-slider/assets/index.css'

import Checkbox from 'material-ui/Checkbox';
import {FormGroup, FormControlLabel} from 'material-ui/Form';

import ListSubheader from 'material-ui/List/ListSubheader';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';

import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';

import FilterIcon from 'material-ui-icons/Filter';
import EqualizerIcon from 'material-ui-icons/Equalizer';


import ContinuousFilter from './ContinuousFilter'


const filterPanelStyle = {
  width: '100%',
  padding: '1em',
  borderTop: '1px #777777 Solid',
  borderBottom: '1px #777777 Solid'

}

const log = (value) => {
  console.log(value)
}

const percentFormatter = (v) => {
  return `${v} %`
}

const SliderWithTooltip = createSliderWithTooltip(Slider)


const sliderRowStyle = {
  display: 'flex',
  alignItems: 'center',
}

class EdgeFilter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 50,
      open: true
    };
  }

  onSliderChange = (value) => {
    log(value);
    this.setState({
      value,
    });
  }

  onAfterChange = (value) => {
    console.log(value)
  }


  handleChange = name => event => {
    this.setState({[name]: event.target.checked});
  }

  handleClick() {

  }

  render() {

    const filters = this.props.filters.toJS()

    let primaryFilter = null


    console.log(filters)
    let filterNames = Object.keys(filters)

    filterNames.forEach(name => {
      if(filters[name].isPrimary) {
        primaryFilter = name
      }
    })

    filterNames = filterNames.filter(name => (name !== primaryFilter))


    if (filterNames === undefined) {
      return (<div></div>)
    }

    return (
      <div style={filterPanelStyle}>

        <List subheader={<ListSubheader>Filters</ListSubheader>}>

          <ListItem>
            <ListItemIcon>
              <FilterIcon />
            </ListItemIcon>
            <ListItemText inset primary="Primary Filter" />
            <ContinuousFilter
              key={primaryFilter}
              label={primaryFilter}
            />
          </ListItem>

          <ListItem button onClick={this.handleClick}>
            <ListItemIcon>
              <EqualizerIcon />
            </ListItemIcon>
            <ListItemText inset primary="Edge Filters" />
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={this.state.open} transitionDuration="auto" unmountOnExit>

          {
            filterNames.map(filterName => (
              <ListItem>
                <ContinuousFilter
                  key={filterName}
                  label={filterName}
                />
              </ListItem>
            ))
          }

          </Collapse>
        </List>
      </div>
    )
  }
}

export default EdgeFilter
