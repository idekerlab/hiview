import React, {Component} from 'react'

const MAX_SELECTED= 5

const PRESET_COLORS = {
  ENABLED: '#333333',
  DISABLED: '#CCCCCC'
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


class BaseFilter extends Component {

  constructor(props) {
    super(props);

    this.state = {
      checked: false,
      disabled: false,
      labelColor: PRESET_COLORS.ENABLED,
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
    return (
      <div></div>
    )
  }
}

export default BaseFilter
