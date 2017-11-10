import React, {Component} from 'react'

import Slider, {createSliderWithTooltip} from 'rc-slider'
import 'rc-slider/assets/index.css'

import Checkbox from 'material-ui/Checkbox';
import {FormGroup, FormControlLabel} from 'material-ui/Form';


const filterPanelStyle = {
  width: '100%',
  padding: '1em',
  borderTop: '1px #777777 Solid',
  borderBottom: '1px #777777 Solid'

}

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
      value: 50,
    };
  }

  onSliderChange = (value) => {
    log(value);
    this.setState({
      value,
    });
  }

  onAfterChange = (value) => {
    console.log(value)
  }


  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  }

  render() {

    return (
      <div style={filterPanelStyle}>

        <h3>
          Edge Filter:
        </h3>

        <div style={sliderRowStyle}>
          <FormControlLabel
            style={{width: '40%'}}
            control={
              <Checkbox
                checked={this.state.checkedA}
                onChange={this.handleChange('checkedA')}
                value="checkedA"
              />
            }
            label="Edge Type 1"
          />
          <SliderWithTooltip
            style={{width: '80%'}}
            tipFormatter={percentFormatter}
            tipProps={{overlayClassName: 'Score'}}
            onChange={this.onSliderChange}
            trackStyle={{backgroundColor: 'teal'}}
          />
        </div>
        <div style={sliderRowStyle}>
          <FormControlLabel
            style={{width: '40%'}}
            control={
              <Checkbox
                checked={this.state.checkedB}
                onChange={this.handleChange('checkedB')}
                value="checkedB"
              />
            }
            label="Edge Type 2"
          />
          <SliderWithTooltip
            style={{width: '80%'}}
            tipFormatter={percentFormatter}
            tipProps={{overlayClassName: 'Score'}}
            onChange={this.onSliderChange}
            trackStyle={{backgroundColor: 'teal'}}
          />
        </div>
      </div>
    )
  }
}

export default EdgeFilter
