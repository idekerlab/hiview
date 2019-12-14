import React, { Component } from 'react'
import Slider, { createSliderWithTooltip } from 'rc-slider'
import 'rc-slider/assets/index.css'

import { teal } from '@material-ui/core/colors'

const SliderWithTooltip = createSliderWithTooltip(Slider)

const rootStyle = {
  display: 'flex',
  alignItems: 'center',
  paddingTop: '3em',
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
    this.setState({ value })

    console.log('### Filter chnge = ', this.props)

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

    const minNumber = Number(primaryFilter.value)

    this.setState({ primaryFilter: primaryFilter, value: minNumber })
    // Apply the filter once:
    const attrName = primaryFilter.attributeName

    this.setState({ value: minNumber })
    const newOptions = {
      options: {
        type: 'numeric',
        isPrimary: true,
        range: '[' + attrName + ' < ' + minNumber + ']'
      }
    }
    this.props.commandActions.filterEdges(newOptions)
  }

  render() {
    if (this.state.primaryFilter === null) {
      return <div />
    }

    const primaryFilter = this.state.primaryFilter

    const minNumber = Number(primaryFilter.min)
    const maxNumber = Number(primaryFilter.max)

    if (
      minNumber === undefined ||
      maxNumber === undefined ||
      isNaN(minNumber) ||
      isNaN(maxNumber)
    ) {
      return <div />
    }
    const min = minNumber.toFixed(2)
    const max = maxNumber.toFixed(2)
    let val = this.state.value
    if (val === undefined) {
      val = 0
    }

    let marks = this.props.marks

    if (!marks) {
      marks = {
        [Number(min)]: {
          style: { color: '#666666', fontSize: '1em' },
          label: min
        },
        [val]: {
          style: { color: '#333333', fontSize: '1.2em' },
          label: val + ' < score'
        },
        [Number(max)]: {
          style: { color: '#666666', fontSize: '1em' },
          label: max
        }
      }
    }

    return (
      <div style={rootStyle}>
        <SliderWithTooltip
          style={{ height: '4em' }}
          defaultValue={val}
          min={Number(min)}
          max={Number(max)}
          step={0.001}
          onAfterChange={this.onAfterChange}
          marks={marks}
          trackStyle={trackStyle}
          handleStyle={[handleStyle]}
          railStyle={railStyle}
          onMouseEnter={ev => this.handleHover(ev)}
        />
      </div>
    )
  }
}

export default PrimaryFilter
