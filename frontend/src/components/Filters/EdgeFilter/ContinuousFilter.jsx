import React, { useState } from 'react'

import Slider, { createSliderWithTooltip } from 'rc-slider'
import 'rc-slider/assets/index.css'

import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import BaseFilter from './BaseFilter'

const SliderWithTooltip = createSliderWithTooltip(Slider)

const sliderRowStyle = {
  padding: '1em',
  width: '100%',
  height: '0.5em',
  display: 'flex',
  alignItems: 'center'
}

class ContinuousFilter extends BaseFilter {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.value
    }
  }

  onSliderChange = value => {
    this.setState({
      value
    })
  }

  onAfterChange = value => {
    this.props.commandActions.filterEdges({
      options: {
        type: 'numeric',
        targetType: this.props.label,
        isPrimary: this.props.isPrimary,
        range:
          'edge[interaction = "' +
          this.props.label +
          '"][' +
          this.props.label +
          ' < ' +
          value +
          ']'
      }
    })

  }

  onChecked = () => {
    this.setState({ value: this.props.value })
    this.filterSelected(0)
  }

  render() {
    return (
      <div style={sliderRowStyle}>
        <FormControlLabel
          style={{ width: '40%' }}
          control={
            <Checkbox
              disabled={this.state.disabled}
              style={{
                width: '1em',
                height: '1em',
                paddingRight: '0.2em',
                color: this.state.labelColor
              }}
              onChange={this.onChecked}
              value={this.props.label}
            />
          }
          label={this.props.label}
        />

        <SliderWithTooltip
          style={{ width: '58%' }}
          disabled={!this.state.checked}
          value={this.state.value}
          onChange={this.onSliderChange}
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
          onAfterChange={this.onAfterChange}
        />
      </div>
    )
  }
}

export default ContinuousFilter
