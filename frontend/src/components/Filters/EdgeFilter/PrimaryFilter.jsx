import React, { Component } from 'react'
import Slider, { createSliderWithTooltip } from 'rc-slider'
import 'rc-slider/assets/index.css'

import { teal } from 'material-ui/colors'

const SliderWithTooltip = createSliderWithTooltip(Slider)

const rootStyle = {
  display: 'flex',
  alignItems: 'center',
  paddingTop: '0.8em',
  paddingBottom: '0.8em',
  paddingLeft: 40,
  paddingRight: 20
}

const sliderColor = '#EEEEEE'
const trackStyle = { backgroundColor: sliderColor }
const handleStyle = {
  borderColor: sliderColor
}
const railStyle = { backgroundColor: teal[300] }

class PrimaryFilter extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: 0,
      primaryFilter: null
    }
  }

  onAfterChange = value => {

    console.log('New th value = ', value)

    this.setState({value})
    this.props.commandActions.filterEdges({
      options: {
        type: 'numeric',
        isPrimary: true,
        range:
          '[' + this.state.primaryFilter.attributeName + ' < ' + value + ']'
      }
    })
  }

  componentDidMount() {
    const filters = this.props.filters

    if (!filters || filters.length === 0) {
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

    const th = primaryFilter.threshold

    this.setState({ primaryFilter: primaryFilter, value: th })
  }

  render() {
    if (this.state.primaryFilter === null) {
      return <div />
    }

    const primaryFilter = this.state.primaryFilter

    const minNumber = Number(primaryFilter.min)
    const maxNumber = Number(primaryFilter.max)

    if(!minNumber || !maxNumber) {
      return <div />
    }
    const min = minNumber.toFixed(5)
    const max = maxNumber.toFixed(5)
    const val = this.state.value

    const marks = {
      [Number(min)]: { style: { color: '#666666', fontSize: '1em' }, label: min },
      [val]: { style: { color: '#333333', fontSize: '1.2em' }, label: val + ' < score'},
      [Number(max)]: { style: { color: '#666666', fontSize: '1em' }, label: max }
    }

    return (
      <div style={rootStyle}>

        <SliderWithTooltip
          style={{ height: '4em' }}
          defaultValue={Number(primaryFilter.threshold)}
          min={Number(min)}
          max={Number(max)}
          step={0.00001}
          onAfterChange={this.onAfterChange}
          marks={marks}
          trackStyle={trackStyle}
          handleStyle={[handleStyle]}
          railStyle={railStyle}
        />
      </div>
    )
  }
}

export default PrimaryFilter
