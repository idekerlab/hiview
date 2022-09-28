import React from 'react'
import {
  Tooltip,
  Typography,
  Switch,
  FormControlLabel,
} from '@material-ui/core'

import BaseFilter from './BaseFilter'

// Special tag for DDRAM project
const APMS_LABEL = 'New AP-MS'
const APMS_TAG = 'AP_MS'

const filterRowStyle = {
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
    let { label, tooltip } = this.props

    if (label !== undefined && label.includes(APMS_TAG)) {
      label = APMS_LABEL
    }

    return (
      <div style={filterRowStyle}>
        <Tooltip
          title={<Typography variant="body1">{tooltip}</Typography>}
          arrow
        >
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
        </Tooltip>
      </div>
    )
  }
}

export default BooleanFilter
