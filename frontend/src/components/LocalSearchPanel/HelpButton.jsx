import React, { useState, useEffect } from 'react'

import IconButton from '@material-ui/core/IconButton'
import HelpIcon from '@material-ui/icons/HelpOutlineOutlined'
import { Tooltip } from '@material-ui/core'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Tour from '../Tour'

import {checkFirstTimeVisitor} from '../Tour/check-visitor'


const HelpButton = () => {
  const OVERVIEW_URL = 'https://github.com/idekerlab/hiview/wiki/HiView-User-Guide'
  const USER_GUIDE_URL = 'https://github.com/idekerlab/hiview/blob/master/README.md'
  const [anchorEl, setAnchorEl] = useState(null)
  const [tourOpen, setTourOpen] = useState(false)

  // Check first time visitor
  useEffect(() => {
    if(checkFirstTimeVisitor()) {
      setTourOpen(true)
    }
  }, [])

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleTour = () => {
    setAnchorEl(null)
    setTourOpen(true)
  }

  const handleOverview = event => {
    window.open(OVERVIEW_URL)
  }

  const handleUserGuide = () => {
    window.open(USER_GUIDE_URL)
  }

  const tooltipStyle = {
    fontSize: '16px',
    fontWeight: '300',
    textAlign: 'center',
  }

  return (
    <>
      <Tooltip arrow placement={'bottom'} title={<span style={tooltipStyle}>Help</span>}>
        <IconButton aria-label="Help" onClick={handleClick}>
          <HelpIcon color={'secondary'} />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleTour}>Take the tour</MenuItem>
        <MenuItem onClick={handleUserGuide}>HiView User Guide</MenuItem>
        <MenuItem onClick={handleOverview}>HiView Overview</MenuItem>
      </Menu>
      <Tour open={tourOpen} setOpen={setTourOpen} />
    </>
  )
}

export default HelpButton
