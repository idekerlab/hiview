import React, { useState, useEffect } from 'react'
//import { useCookies } from 'react-cookie'
//import Cookies from 'universal-cookie'

import IconButton from '@material-ui/core/IconButton'
import HelpIcon from '@material-ui/icons/HelpOutlineOutlined'
import { Tooltip } from '@material-ui/core'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Tour from '../Tour'

const HelpButton = () => {
  const HELP_WIKI_URL = 'https://github.com/idekerlab/hiview/wiki'
  const [anchorEl, setAnchorEl] = useState(null)
  const [tourOpen, setTourOpen] = useState(false)

  /*
  useEffect(() => {
    const cookies = new Cookies()
    cookies.set('myCat', 'Pacman', { path: '/' })
    console.log(cookies.get('myCat'))
  }, [])
  //const [cookies, setCookies] = useCookies('firstVisit')

  /*
  useEffect(() => {
    setCookies('firstVisit', 'false', {
      path: '/',
    })
  }, [])
*/
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

  const handleDocumentation = event => {
    window.open(HELP_WIKI_URL)
  }

  const tooltipStyle = {
    fontSize: '16px',
    fontWeight: '300',
    textAlign: 'center',
  }

  return (
    <>
      <Tooltip arrow placement={'bottom'}>
        {
          //title={<span style={tooltipStyle}>Help</span>}>
        }
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
        <MenuItem onClick={handleDocumentation}>HiView User Guide</MenuItem>
      </Menu>

      <Tour open={tourOpen} setOpen={setTourOpen} />
    </>
  )
}

export default HelpButton
