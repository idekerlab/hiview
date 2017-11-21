import React, {Component} from 'react'

import Checkbox from 'material-ui/Checkbox';
import {FormControlLabel} from 'material-ui/Form';
import {withStyles} from 'material-ui/styles'




const filterRowStyle = {
  padding: '1em',
  width: '100%',
  height: '0.5em',
  display: 'flex',
  alignItems: 'center',
}

const styles = {
  root: {
    width: '100%',
    display: 'inline-flex',

    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '1em',
    paddingBottom: '1em',
  },
  label: {
    color: 'blue'
  }
}



class BooleanFilter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      disabled: false,
      labelColor: '#333333'
    };
  }

  filterSelected = value => {
    const currentValue = this.state.checked

    if(this.props.selected.length >= 5) {
      if(!currentValue) {
        return
      }
    }

    this.setState({checked: !currentValue});

    if(!currentValue) {
      this.props.selected.push(this.props.label)


      const color = this.props.colorMap(this.props.selected.length - 1)
      this.setState({labelColor: color})
      this.props.commandActions.expandEdges(
        [this.props.label]
      )

    } else {
      this.setState({labelColor: '#333333'})
      if(this.props.selected.length >= 5) {
        this.props.selected.pop()
      }

    }

  }


  componentWillReceiveProps(nextProps) {

    console.log("BOOLEAN FIL-----------> " + this.props.label)
  }


  render() {
    const {classes} = this.props

    return (

      <div style={filterRowStyle}>
        <FormControlLabel
          style={{width: '95%'}}
          control={
            <Checkbox
              disabled={this.props.selected.length >= 5 && this.state.enabled}
              style={{width: '1em', height: '1em', color: this.state.labelColor}}
              checked={this.state.enabled}
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

export default withStyles(styles)(BooleanFilter)
