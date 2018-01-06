import React from "react";
import { ContextMenu, MenuItem} from "react-contextmenu";

import classnames from 'classnames'
import style from './style.css'

const handleClick = (e, data) => {
  console.log("right click")
  console.log(data);
}


const NetworkContextMenu = (props) => (
    <ContextMenu className={classnames(style["react-contextmenu"])} id="some_unique_identifier">

      <MenuItem classes={classnames(style["react-contextmenu-item"])}  data={{data1: "some_data"}} onClick={handleClick}>
        Move to parent subsystem
      </MenuItem>

      <MenuItem data={{data2: "some_data"}} onClick={handleClick}>
        Children
      </MenuItem>
      <MenuItem divider />
      <MenuItem data={{data3: "some_data"}} onClick={handleClick}>
        Show help...
      </MenuItem>
    </ContextMenu>

)

export default NetworkContextMenu