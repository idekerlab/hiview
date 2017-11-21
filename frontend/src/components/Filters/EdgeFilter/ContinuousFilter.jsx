import React, {Component} from 'react'

import Slider, {createSliderWithTooltip} from 'rc-slider'
import 'rc-slider/assets/index.css'

import Checkbox from 'material-ui/Checkbox';
import {FormControlLabel} from 'material-ui/Form';

import BaseFilter from './BaseFilter'

const SliderWithTooltip = createSliderWithTooltip(Slider)

const sliderRowStyle = {
  padding: '1em',
  width: '100%',
  height: '0.5em',
  display: 'flex',
  alignItems: 'center',
}

class ContinuousFilter extends BaseFilter {

  constructor(props) {
    super(props);
    this.state = {
      sliderValue: this.props.value
    };
  }


  onAfterChange= value => {
    this.props.commandActions.filterEdges({
      options: {
        type: 'numeric',
        isPrimary: this.props.isPrimary,
        range: '[' + this.props.label + ' >= ' + value + ']'
      }
    })
  }


  render() {
    return (

      <div style={sliderRowStyle}>
        <FormControlLabel
          style={{width: '40%'}}
          control={
            <Checkbox
              disabled={this.state.disabled}
              style={{width: '1em', height: '1em', color: this.state.labelColor}}
              checked={this.state.checked}
              onChange={this.filterSelected}
              value={this.props.label}
            />
          }
          label={this.props.label}
        />

        <SliderWithTooltip
          style={{width: '58%'}}
          disabled={!this.state.checked}
          defaultValue={this.props.value}
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
