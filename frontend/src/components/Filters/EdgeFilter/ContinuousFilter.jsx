import React from 'react'

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
      value: this.props.value,
      checked: this.props.enabled
    }
  }

  componentDidMount() {
    const { enabled, value } = this.props
    if (enabled) {
      setTimeout(() => {
        this.setState({
          checked: enabled
        })

        this.filterSelected(enabled)
        this.applyFilter(value)
      }, 20)
    }
  }

  componentWillReceiveProps(nextProps) {
    const current = this.props.currentSystem
    const next = nextProps.currentSystem

    if (current !== next && nextProps.enabled) {
      setTimeout(() => {
        this.filterSelected(true)
        this.applyFilter(this.props.value)
      }, 500)
    }
  }

  onSliderChange = value => {
    // Just update local state value
    this.setState({
      value
    })
  }

  applyFilter = value => {
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

  onAfterChange = value => {
    this.applyFilter(value)
    this.props.uiStateActions.setFilterState({
      name: this.props.label,
      value,
      enabled: this.props.enabled
    })
  }

  onChecked = event => {
    const checked = event.target.checked
    const currentSliderValue = this.props.value
    this.filterSelected(checked)
    this.props.uiStateActions.setFilterState({
      name: this.props.label,
      value: currentSliderValue,
      enabled: checked
    })

    // TODO: create one command to do both in order
    setTimeout(() => {
      this.applyFilter(currentSliderValue)
    }, 10)
  }

  render() {
    const checkBoxStyle = {
      width: '1em',
      height: '1em',
      paddingRight: '0.2em',
      color: this.props.color
    }

    const { label } = this.props

    return (
      <div style={sliderRowStyle}>
        <FormControlLabel
          style={{ width: '40%' }}
          control={
            <Checkbox
              defaultChecked={this.state.checked}
              style={checkBoxStyle}
              onChange={this.onChecked}
              value={label}
            />
          }
          label={label}
        />

        <SliderWithTooltip
          style={{ width: '58%' }}
          disabled={!this.props.enabled}
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
