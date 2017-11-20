import React, {Component} from 'react'

import Slider, {createSliderWithTooltip} from 'rc-slider'
import 'rc-slider/assets/index.css'

import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';

import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import FilterIcon from 'material-ui-icons/Filter';
import EqualizerIcon from 'material-ui-icons/Equalizer';

import ContinuousFilter from './ContinuousFilter'
import BooleanFilter from './BooleanFilter'

import { withStyles } from 'material-ui/styles';


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
      open: true
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
          <ListItem className={classes.listItemLarge}>
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
            className={classes.listItemLarge}
            button
            onClick={this.handleClick}
            key={'parent'}
          >
            <ListItemIcon>
              <EqualizerIcon/>
            </ListItemIcon>
            <ListItemText inset primary="Other Edge Filters"/>
            {this.state.open ? <ExpandLess/> : <ExpandMore/>}
          </ListItem>

          <Collapse in={this.state.open} transitionDuration="auto" unmountOnExit>

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
          value={Number(filter.min)}
          enabled={filter.enabled}
          step={0.001}
          filtersActions={this.props.filtersActions}
          commandActions={this.props.commandActions}
          commands={this.props.commands}
          isPrimary={false}
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

export default withStyles(styles)(EdgeFilter);
