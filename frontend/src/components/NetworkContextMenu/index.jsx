import React from "react";
import { ContextMenu, MenuItem, SubMenu} from "react-contextmenu";


const handleClick = (e, data) => {
  console.log("right click")
  console.log(data);
}

const toggleShowGenes = (id, props) => {
  console.log("Show/Hide edges")
  console.log(id);
  console.log(props)

  props.commandActions.hideNeighbours([id, "Gene", false])
}

const NetworkContextMenu = (props) => {

  let selected = null
  if(props.hoverNode !== null) {
    selected = props.hoverNode.Label
  }

  return (
    <ContextMenu id="networkContextMenu">

      <MenuItem disabled={true} data={{title: selected}} onClick={handleClick}>
        {selected}
      </MenuItem>

      <MenuItem divider />

      <MenuItem data={{}} onClick={(e) => toggleShowGenes(props.hoverNode.id, props)}>
        Show / Hide Genes
      </MenuItem>

      <SubMenu title='Move to...'>
        <MenuItem onClick={handleClick} data={{ item: 'subsubitem 1' }}>Parents</MenuItem>
        <MenuItem onClick={handleClick} data={{ item: 'subsubitem 2' }}>Children</MenuItem>
      </SubMenu>

      <MenuItem divider />

      <MenuItem data={{data3: "some_data"}} onClick={handleClick}>
        Show help...
      </MenuItem>
    </ContextMenu>
  )
}

export default NetworkContextMenu