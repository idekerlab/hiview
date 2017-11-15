import React, {Component} from 'react'

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import green from 'material-ui/colors/green';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';


const baseStyle = {
  width: '100%',
  padding: '1em',
  background: '#FAFAFA',
  color: '#333333'

}

const titleStyle = {
  color: '#111111',
  fontWeight: 400
}

class GroupSelector extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  handleChange = name => event => {



    const checked = event.target.checked
    const toBeSelected = this.props.groups[name]

    console.log(toBeSelected)

    if(checked) {
      // Select nodes
      // this.props.commandActions.select({idList: toBeSelected})
    }
  }

  render() {

    const groupNames = Object.keys(this.props.groups)

    return(
      <div style={baseStyle}>
        <div style={titleStyle}>
          Assigned gene selector:
        </div>
        <FormGroup row>
          {
            groupNames.map(group => {
              return (
                <FormControlLabel
                  key={group}
                control={
                  <Checkbox
                    checked={this.state[group]}
                    onChange={this.handleChange(group)}
                    value={group}
                  />
                }
                label={group}
              />)
            })
          }
        </FormGroup>
      </div>
    )
  }
}

export default GroupSelector
