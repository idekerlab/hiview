import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { IconButton } from '@material-ui/core'
import { fade } from '@material-ui/core/styles/colorManipulator'
import HelpIcon from '@material-ui/icons/HelpOutlineOutlined'

import Tour from 'reactour'


const useStyles = makeStyles({
  tourButton: {
    color: '#4DA1DE',
    '&:active': {
      borderColor: '#4DA1DE',
      color: '#4DA1DE',
    },
    '&:hover': {
      backgroundColor: fade('#4DA1DE', 0.2),
    },
  },
  buttonIcon: {
    height: '2.5em',
    marginLeft: '0.5em',
  },
})

const TourButton = props => {
  const classes = useStyles()
  const [isTourOpen, setIsTourOpen] = useState(true);


  const _handleOpen = event => {}

  const steps = [
    {
      selector: '#network-panel',
      content: 'Hierarchy as a circle packing diagram. Drag to pan, and zoom by mouse wheel.'
    },
    {
      selector: '#network-panel',
      content: 'You can expand the subsystems by double-clicking the circles'
    },
    {
      selector: '#property-panel',
      content: 'Data panel: details about the selected subsystem will be displayed in this panel.',
    },
    {
      selector: '#interaction-panel',
      content: 'Interaction viewer: interaction data associated with the subsystem will be displayed as a node-link diagram.',
    },
    {
      selector: '#search-panel',
      content: 'Search panel: you can search the hierarchy by gene name or keyword.',
    }
  ]

  return (
    <>
    <IconButton id={'tour-start'}className={classes.tourButton} variant={'outlined'} onClick={_handleOpen}>
      <HelpIcon />
    </IconButton>
    <Tour
        steps={steps}
        isOpen={isTourOpen}
        onRequestClose={() => setIsTourOpen(false)}
      />
    </>
  )
}

export default TourButton
