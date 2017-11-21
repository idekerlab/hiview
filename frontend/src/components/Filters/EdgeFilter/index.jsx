import React, {Component} from 'react'

import Slider, {createSliderWithTooltip} from 'rc-slider'
import 'rc-slider/assets/index.css'

import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';

import ContinuousFilter from './ContinuousFilter'
import BooleanFilter from './BooleanFilter'

import { withStyles } from 'material-ui/styles';

import * as d3Scale from 'd3-scale'
const colorMap = d3Scale.scaleOrdinal(d3Scale.schemeCategory10)


const FILTER_TYPES = {
  CONTINUOUS: 'continuous',
  BOOLEAN: 'boolean'
}


const styles = theme => ({
  root: {
    width: '100%',
    background: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
  },
  list: {

  },
  listItemLarge: {
    height: '1.3em',
    margin: 0,
    padding: '0.3em'
  },
  listItem: {
    height: '1em',
    margin: 0,
    padding: '0.2em'
  }
});


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
      open: true,
      selected: new Array(5)
    }
  }

  onAfterChange = (value) => {
    console.log(value)
  }


  handleChange = name => event => {
    this.setState({[name]: event.target.checked});
  }

  handleClick = (event) => {

    const isOpen = this.state.open

    this.setState({
      open: !isOpen
    });
  }

  render() {

    const { classes } = this.props
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
      <div className={classes.root}>
        <List>
            {
              sortedNames.map(filterName => (
                <ListItem
                  className={classes.listItem}
                  key={filterName}
                >
                  {this.getFilter(filterMap[filterName])}
                </ListItem>
              ))
            }

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
          value={Number(filter.min)}
          enabled={filter.enabled}
          step={0.001}
          filtersActions={this.props.filtersActions}
          commandActions={this.props.commandActions}
          commands={this.props.commands}
          isPrimary={false}
          selected={this.state.selected}
          colorMap={colorMap}
        />
      )
    } else if(filterType === FILTER_TYPES.BOOLEAN) {
      return(
        <BooleanFilter
          key={filter.attributeName}
          label={filter.attributeName}
          enabled={filter.enabled}
          filtersActions={this.props.filtersActions}
          commandActions={this.props.commandActions}
          selected={this.state.selected}
          colorMap={colorMap}
        />
      )

    }
  }
}

export default withStyles(styles)(EdgeFilter);
