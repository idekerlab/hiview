import React from 'react'
import Popover from '@material-ui/core/Popover'
import { Popper } from '@material-ui/core'

const CustomPopover = ({content = {x: 0, y: 0, text: '?'}, open=false}) => (
  <Popper
    anchorReference="anchorPosition"
    anchorPosition={{ top: content.x, left: content.y }}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    transformOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    open={open}
  >
    {content.text}
  </Popper>
)

export default CustomPopover