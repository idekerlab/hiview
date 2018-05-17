import React from 'react'
import { ContextMenu, MenuItem} from 'react-contextmenu'

const toggleShowGenes = (id, props) => {
  console.log('Show/Hide edges')
  console.log(id)
  console.log(props)

  props.commandActions.hideNeighbours([id, 'Gene', false])
}

const NetworkContextMenu = props => {
  let selected = null


  if (props.hoverNode !== null) {
    selected = props.hoverNode.Label
  } else {
    return <div/>
  }

  return (
    <ContextMenu id="networkContextMenu">
      <MenuItem disabled={true} data={{ title: selected }}>
        {selected}
      </MenuItem>

      <MenuItem divider />

      <MenuItem
        data={{}}
        onClick={e => toggleShowGenes(props.hoverNode.id, props)}
      >
        Show / Hide Genes
      </MenuItem>
    </ContextMenu>
  )
}

export default NetworkContextMenu
