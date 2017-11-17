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
import BooleanFilter from './BooleanFilter'


const FILTER_TYPES = {
  CONTINUOUS: 'continuous',
  BOOLEAN: 'boolean'
}


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

    this.setState({
      open: !this.state.open,
    });
  }

  render() {

    const filters = this.props.filters


    if (filters === null || filters.length === 0) {
      return (<div></div>)
    }

    let primaryFilter = null
    const filterNames = []
    const filterMap = {}

    filters.forEach(filter => {
      const isPrimary = filter.isPrimary
      if(isPrimary) {
        primaryFilter = filter
      } else {
        filterNames.push(filter.attributeName)
        filterMap[filter.attributeName] = filter
      }
    })

    const sortedNames = filterNames.sort()


    return (
      <div style={filterPanelStyle}>

        <List>

          <ListItem>
            <ListItemIcon>
              <FilterIcon/>
            </ListItemIcon>
            <ContinuousFilter
              key={primaryFilter.attributeName}
              label={primaryFilter.attributeName}
              min={Number(primaryFilter.min)}
              max={Number(primaryFilter.max)}
              value={primaryFilter.threshold}
              enabled={primaryFilter.enabled}
              step={0.001}
              filtersActions={this.props.filtersActions}
              commandActions={this.props.commandActions}
              commands={this.props.commands}
              isPrimary={true}
            />
          </ListItem>

          <ListItem
            button
            onClick={this.handleClick}
            key={'parent'}
          >
            <ListItemIcon>
              <EqualizerIcon/>
            </ListItemIcon>
            <ListItemText inset primary="Edge Filters"/>
            {this.state.open ? <ExpandLess/> : <ExpandMore/>}
          </ListItem>

          <Collapse in={this.state.open} transitionDuration="auto" unmountOnExit>

            {
              sortedNames.map(filterName => (
                <ListItem
                  key={filterName}
                >
                  {this.getFilter(filterMap[filterName])}
                </ListItem>
              ))
            }

          </Collapse>
        </List>
      </div>
    )
  }

  getFilter(filter) {

    const filterType = filter.type

    if (filterType === FILTER_TYPES.CONTINUOUS) {
      return (
        <ContinuousFilter
          key={filter.attributeName}
          label={filter.attributeName}
          min={Number(filter.min)}
          max={Number(filter.max)}
          value={Number(filter.max)}
          enabled={filter.enabled}
          step={0.01}
          filtersActions={this.props.filtersActions}
        />
      )
    } else if(filterType === FILTER_TYPES.BOOLEAN) {
      return(
        <BooleanFilter
          key={filter.attributeName}
          label={filter.attributeName}
          enabled={filter.enabled}
          filtersActions={this.props.filtersActions}
        />
      )

    }
  }
}

export default EdgeFilter
