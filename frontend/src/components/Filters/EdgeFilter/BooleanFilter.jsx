import React, { Component } from 'react'

import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import BaseFilter from './BaseFilter'

// Special tag for DDRAM project
const APMS_LABEL = 'New AP-MS of 22 DDR bait proteins [ Kratz 2022, under review ]'

const filterRowStyle = {
  paddingTop: '1.5em',
  width: '100%',
  height: '0.8em',
  display: 'flex',
  alignItems: 'center'
}

class BooleanFilter extends BaseFilter {
  onChecked = event => {
    const checked = event.target.checked
    this.setState({
      checked: checked
    })
    this.filterSelected(checked)
    this.props.uiStateActions.setFilterState({
      name: this.props.label,
      value: true,
      enabled: checked
    })
  }

  componentWillReceiveProps(nextProps) {
    const current = this.props.currentSystem
    const next = nextProps.currentSystem
    const checked = this.state.checked

    if (current !== next && checked) {
      setTimeout(() => {
        this.filterSelected(true)
        this.props.uiStateActions.setFilterState({
          name: this.props.label,
          value: true,
          enabled: true
        })
      }, 100)
    }
  }

  render() {
    let label = this.props.label

    if(label !== undefined && label.includes('AP_MS')) {
      label = APMS_LABEL
    } 

    return (
      <div style={filterRowStyle}>
        <FormControlLabel
          style={{ width: '95%' }}
          control={
            <Checkbox
              disabled={this.state.disabled}
              style={{
                width: '1em',
                height: '1em',
                paddingRight: '0.5em',
                color: this.state.labelColor
              }}
              checked={this.state.checked}
              onChange={this.onChecked}
              value={label}
            />
          }
          label={label}
        />
      </div>
    )
  }
}

export default BooleanFilter
