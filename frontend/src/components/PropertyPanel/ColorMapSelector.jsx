import React, {Component, PropTypes} from 'react'

import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch'

class ColorMapSelector extends Component {

  constructor(props) {
    super(props)

    this.state = {
      enabled: true
    }
  }

  render() {
    return (

      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={this.state.enabled}
              onChange={(event, checked) => this.setState({ enabled: checked })}
            />
          }
          label="Enable Primary Edge Color Mapping:"
        />
      </FormGroup>
    )
  }

}

export default ColorMapSelector
