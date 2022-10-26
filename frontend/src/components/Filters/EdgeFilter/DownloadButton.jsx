import React from 'react'
import { IconButton, Tooltip, Typography } from '@material-ui/core'
import OpenInIcon from '@material-ui/icons/OpenInNew'

export const DownloadButton = ({ tooltip = 'Download data', url }) => {
  const handleClick = () => {
    window.open(url, '_newtab')
  }

  return (
    <Tooltip title={<Typography variant="body1">{tooltip}</Typography>} arrow>
      <IconButton onClick={handleClick}>
        <OpenInIcon />
      </IconButton>
    </Tooltip>
  )
}
