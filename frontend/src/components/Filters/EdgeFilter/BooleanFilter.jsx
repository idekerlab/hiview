import React, {Component} from 'react'

import Checkbox from 'material-ui/Checkbox';
import {FormControlLabel} from 'material-ui/Form';
import {withStyles} from 'material-ui/styles'

const MAX_SELECTED= 5

const PRESET_COLORS = {
  ENABLED: '#333333',
  DISABLED: '#CCCCCC'
}


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
    color: PRESET_COLORS.ENABLED
  }
}

const countItem = fixedArray => {
  let i = fixedArray.length
  let itemCount = 0
  while(i--) {
    if(fixedArray[i] !== undefined) {
      itemCount++
    }
  }
  return itemCount
}


class BooleanFilter extends Component {

  constructor(props) {
    super(props);

    this.state = {
      checked: false,
      disabled: false,
      labelColor: PRESET_COLORS.ENABLED,
      pointer: 0
    }
  }



  filterSelected = value => {
    const currentValue = this.state.checked
    const selectedItems = this.props.selected

    if(!currentValue) {
      //　Insert to the first empty spot
      let itemIdx = 0

      for(itemIdx; itemIdx<selectedItems.length; itemIdx++) {
        const item = selectedItems[itemIdx]
        if(item === undefined) {
          selectedItems[itemIdx] = this.props.label
          break
        }
      }

      const color = this.props.colorMap(itemIdx)
      this.setState({
        checked: !currentValue,
        labelColor: color})
      this.props.commandActions.expandEdges(
        {
          edgeType: this.props.label,
          edgeColor: color
        }
      )
    } else {

      //　Remove
      for(let i = 0; i<selectedItems.length; i++) {
        const item = selectedItems[i]
        if(item === this.props.label) {
          selectedItems[i] = undefined
          break
        }
      }
      this.setState({
        checked: !currentValue,
        labelColor: PRESET_COLORS.ENABLED
      })

      this.props.commandActions.collapseEdges(this.props.label)
    }
  }


  componentWillReceiveProps(nextProps) {
    const numberOfSelected = countItem(nextProps.selected)

    if (numberOfSelected === MAX_SELECTED) {
      if (!nextProps.selected.includes(this.props.label)) {
        this.setState({
          disabled: true,
          labelColor: PRESET_COLORS.DISABLED
        })
      }
    } else if (numberOfSelected < MAX_SELECTED) {
      if (!nextProps.selected.includes(this.props.label)) {
        this.setState({
          disabled: false,
          labelColor: PRESET_COLORS.ENABLED
        })
      } else {
        this.setState({
          disabled: false
        })
      }
    }
  }



  render() {
    const {classes} = this.props

    return (

      <div style={filterRowStyle}>
        <FormControlLabel
          style={{width: '95%'}}
          control={
            <Checkbox
              disabled={this.state.disabled}
              style={{width: '1em', height: '1em', color: this.state.labelColor}}
              checked={this.state.checked}
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
