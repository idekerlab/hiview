import React, { useState, useEffect } from 'react'
import { Button, Tooltip } from '@material-ui/core'

import FitContent from '@material-ui/icons/ZoomOutMap'

const buttonStyle = {
  position: 'absolute',
  bottom: '1em',
  right: '3em',
}

const FitButton = ({ cyInstance }) => {
  const handleFit = (event) => {
    if (cyInstance !== undefined) {
      cyInstance.fit()
    }
  }

  return (
    <Tooltip title={<div>Fit network</div>} arrow placement="bottom">
      <Button
        variant="outlined"
        size="small"
        color="default"
        style={buttonStyle}
        onClick={handleFit}
      >
        <FitContent />
      </Button>
    </Tooltip>
  )
}

export default FitButton
