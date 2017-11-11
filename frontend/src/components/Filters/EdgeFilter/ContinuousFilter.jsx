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
      enabled: false
    };
  }

  onSliderChange = value => {
    this.setState({value});
  }

  filterSelected = value => {
    console.log("SELECTED!!!")
    const currentValue = this.state.enabled
    this.setState({enabled: !currentValue});

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
          tipProps={{overlayClassName: 'Score'}}
          onChange={this.onSliderChange}
          disabled={!this.state.enabled}
        />
      </div>
    )
  }
}

export default ContinuousFilter
