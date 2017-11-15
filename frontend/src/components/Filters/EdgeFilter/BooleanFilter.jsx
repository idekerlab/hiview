import React, {Component} from 'react'

import Checkbox from 'material-ui/Checkbox';
import {FormControlLabel} from 'material-ui/Form';




const filterRowStyle = {
  padding: '1em',
  width: '100%',
  height: '0.5em',
  display: 'flex',
  alignItems: 'center',
}

class BooleanFilter extends Component {


  filterSelected = value => {
    const currentValue = this.props.enabled
    this.props.filtersActions.setValue({
      attributeName: this.props.label,
      enabled: !currentValue
    })
  }


  render() {
    return (

      <div style={filterRowStyle}>
        <FormControlLabel
          style={{width: '95%'}}
          control={
            <Checkbox
              checked={this.props.enabled}
              onChange={this.filterSelected}
              value={this.props.label}
            />
          }
          label={this.props.label}
        />
      </div>
    )
  }
}

export default BooleanFilter
