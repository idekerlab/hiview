import React from 'react'
import { IconButton, Tooltip, Typography } from '@material-ui/core'
import DownloadIcon from '@material-ui/icons/CloudDownload'

export const DownloadButton = ({ tooltip = 'Download data', url }) => {
  const handleClick = () => {
    window.open(url, '_newtab')
  }

  return (
    <Tooltip title={<Typography variant="body1">{tooltip}</Typography>} arrow>
      <IconButton onClick={handleClick}>
        <DownloadIcon />
      </IconButton>
    </Tooltip>
  )
}
