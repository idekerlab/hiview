import React, {Component} from 'react'
import {withStyles} from 'material-ui/styles'


import Slider, {createSliderWithTooltip} from 'rc-slider'
import 'rc-slider/assets/index.css'

import { blueGrey } from 'material-ui/colors';

const sliderColor = blueGrey[400];


const SliderWithTooltip = createSliderWithTooltip(Slider)


const styles = theme => ({
  root: {
    width: '100%',
    display: 'inline-flex',

    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '1em',
    paddingBottom: '1em',
  },
})


class PrimaryFilter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      primaryFilter: null
    };
  }


  onAfterChange = value => {
    this.props.commandActions.filterEdges({
      options: {
        type: 'numeric',
        range: '[' + this.state.primaryFilter.attributeName + ' >= ' + value + ']',
      },
    })
  }


  componentDidMount() {
    const filters = this.props.filters

    if (filters === null || filters.length === 0) {
      return
    }

    let primaryFilter = null
    const filterNames = []
    const filterMap = {}

    filters.forEach(filter => {
      const isPrimary = filter.isPrimary
      if (isPrimary) {
        primaryFilter = filter
      } else {
        filterNames.push(filter.attributeName)
        filterMap[filter.attributeName] = filter
      }
    })

    this.setState({primaryFilter: primaryFilter})

  }


  render() {

    const {classes} = this.props

    if (this.state.primaryFilter === null) {
      return (<div/>)
    }

    const primaryFilter = this.state.primaryFilter


    const min = Number(primaryFilter.min).toFixed(3)
    const max = Number(primaryFilter.max).toFixed(3)

    const marks = {
      [min]: min,
      [max]: max,
    };

    return (
      <div className={classes.root}>
        <SliderWithTooltip
          style={{width: '95%', height: '2em'}}
          defaultValue={Number(primaryFilter.threshold)}
          min={Number(primaryFilter.min)}
          max={Number(primaryFilter.max)}
          step={0.001}
          onAfterChange={this.onAfterChange}
          marks={marks}
        />
      </div>
    )
  }


}

export default withStyles(styles)(PrimaryFilter)

