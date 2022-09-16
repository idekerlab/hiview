import React from 'react'
import { Switch, FormControlLabel } from '@material-ui/core'

import BaseFilter from './BaseFilter'

// Special tag for DDRAM project
const APMS_LABEL =
  'New AP-MS [Kratz 2022, under review]'
const APMS_TAG = 'AP_MS'

const filterRowStyle = {
  paddingTop: '1.5em',
  width: '100%',
  height: '0.8em',
  display: 'flex',
  alignItems: 'center',
}

class BooleanFilter extends BaseFilter {

  onChecked = (event) => {
    const checked = event.target.checked
    this.setState({
      checked: checked,
    })
    this.filterSelected(checked)
    this.props.uiStateActions.setFilterState({
      name: this.props.label,
      value: true,
      enabled: checked,
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
          enabled: true,
        })
      }, 100)
    }
  }

  render() {
    let label = this.props.label

    if (label !== undefined && label.includes(APMS_TAG)) {
      label = APMS_LABEL
    }

    return (
      <div style={filterRowStyle}>
        <FormControlLabel
          control={
            <Switch
              disabled={this.state.disabled}
              style={{
                width: '1em',
                height: '1em',
                paddingRight: '0.5em',
              }}
              color={'default'}
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
