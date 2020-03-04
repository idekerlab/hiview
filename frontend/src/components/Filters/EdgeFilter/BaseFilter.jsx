import React, { Component } from 'react'

const MAX_SELECTED = 5

const PRESET_COLORS = {
  ENABLED: '#333333',
  DISABLED: '#CCCCCC'
}

const countItem = fixedArray => {
  let i = fixedArray.length
  let itemCount = 0
  while (i--) {
    if (fixedArray[i] !== undefined) {
      itemCount++
    }
  }
  return itemCount
}

class BaseFilter extends Component {
  constructor(props) {
    super(props)

    this.state = {
      labelColor: PRESET_COLORS.ENABLED
    }
  }

  filterSelected = (enabled) => {
    const {selected, label, color} = this.props

    if (enabled) {
      this.setState({
        labelColor: color
      })

      this.props.commandActions.expandEdges({
        edgeType: label,
        edgeColor: color
      })
    } else {
      //　Remove
      for (let i = 0; i < selected.length; i++) {
        const item = selected[i]
        if (item === label) {
          selected[i] = undefined
          break
        }
      }
      this.setState({
        labelColor: PRESET_COLORS.ENABLED
      })

      this.props.commandActions.collapseEdges(label)
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
    return <div></div>
  }
}

export default BaseFilter
