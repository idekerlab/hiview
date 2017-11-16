import React, {Component} from 'react'

import Slider, {createSliderWithTooltip} from 'rc-slider'
import 'rc-slider/assets/index.css'

import Checkbox from 'material-ui/Checkbox';
import {FormControlLabel} from 'material-ui/Form';


const SliderWithTooltip = createSliderWithTooltip(Slider)


const sliderRowStyle = {
  padding: '1em',
  width: '100%',
  height: '0.5em',
  display: 'flex',
  alignItems: 'center',
}

class ContinuousFilter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      enabled: props.enabled
    };
  }

  onSliderChange = value => {
    this.setState({value});

    this.props.filtersActions.setValue({
      attributeName: this.props.label,
      value
    })
    console.log(this.state.value)
  }

  onAfterChange= value => {

    console.log(value)


    this.props.commandActions.filterEdges({
      options: {
        type: 'numeric',
        range: '[RF_score > ' + value + ']'
      }
    })
  }

  filterSelected = value => {
    console.log("SELECTED!!!")
    const currentValue = this.state.enabled
    this.setState({enabled: !currentValue});
    console.log(this.state.value)

  }

  render() {
    return (

      <div style={sliderRowStyle}>
        <FormControlLabel
          style={{width: '25%'}}
          control={
            <Checkbox
              checked={this.state.enabled}
              onChange={this.filterSelected}
              value={this.props.label}
            />
          }
          label={this.props.label}
        />
        <SliderWithTooltip
          style={{width: '65%'}}
          // onChange={this.onSliderChange}
          disabled={!this.state.enabled}
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
