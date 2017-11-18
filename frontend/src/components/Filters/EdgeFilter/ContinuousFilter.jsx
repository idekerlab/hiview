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
    this.props.commandActions.filterEdges({
      options: {
        type: 'numeric',
        range: '[' + this.props.label + ' >= ' + value + ']'
      }
    })
  }

  filterSelected = value => {
    const currentValue = this.state.enabled
    this.setState({enabled: !currentValue});

  }

  componentDidUpdate() {
  }

  componentWillReceiveProps(nextProps) {
  }

  render() {
    return (

      <div style={sliderRowStyle}>
        <FormControlLabel
          style={{width: '40%'}}
          control={
            <Checkbox
              style={{width: '1em', height: '1em'}}

              checked={this.state.enabled}
              onChange={this.filterSelected}
              value={this.props.label}
            />
          }
          label={this.props.label}
        />
        <SliderWithTooltip
          style={{width: '58%'}}
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
