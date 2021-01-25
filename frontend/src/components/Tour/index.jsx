import React, { useState } from 'react'
import { createStyles, makeStyles } from '@material-ui/core'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Button from '@material-ui/core/Button'

import back from '../../assets/tourImages/image 8.png'

import Slide0 from './Slide0'
import Slide1 from './Slide1'
import Slide2 from './Slide2'
import Slide3 from './Slide3'
import Slide4 from './Slide4'
import Slide5 from './Slide5'
import Slide6 from './Slide6'

const useStyles = makeStyles(theme =>
  createStyles({
    info: {
      position: 'relative',
      left: '0.5em',
      top: '6px',
      height: '0.5em',
      width: '0.5em',
    },
    icon: {
      height: '0.7em',
      width: '0.7em',
      position: 'relative',
      bottom: '2px',
    },
    dialog: {},
    dialogContent: {
      padding: '3em',
      paddingBottom: '0.25em',

      borderBottom: 'none',
      position: 'relative',
      boxSizing: 'border-box',
    },
  }),
)

const Tour = props => {
  const classes = useStyles()
  const defaultSlide = 0
  const { open, setOpen } = props
  const [slide, setSlide] = useState(defaultSlide)
  const slides = [<Slide0 />, <Slide1 />, <Slide2 />, <Slide3 />, <Slide4 />, <Slide5 />, <Slide6 />]

  const handleOpen = () => {
    setSlide(defaultSlide)
  }

  const handlePrevious = () => {
    setSlide(slide - 1)
  }

  const handleNext = () => {
    setSlide(slide + 1)
  }

  const handleClose = () => {
    //Skip to last slide
    if (slide != slides.length - 1) {
      setSlide(slides.length - 1)
    } else {
      setOpen(false)
    }
  }

  const mdStyle = {
    height: '585px',
    width: '800px',
    border: '10px solid #6DACD5',
    borderBottom: 'none',
  }

  const backgroundStyle = {
    height: '585px',
    width: '800px',
    backgroundImage: `url(${back})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    padding: 0,
    border: '10px solid #6DACD5',
    borderBottom: 'none',
  }
  const borderStyle = {
    border: '10px solid #6DACD5',
    borderTop: 'none',
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      onEnter={handleOpen}
      maxWidth={slide == slides.length - 1 ? 'xs' : 'md'}
      className={classes.dialog}
    >
      <DialogContent
        className={classes.dialogContent}
        style={slide == 0 ? backgroundStyle : slide != slides.length - 1 ? mdStyle : null}
      >
        <DialogContentText component="span">{slides[slide]}</DialogContentText>
      </DialogContent>
      <DialogActions style={slide != slides.length - 1 ? borderStyle : null}>
        {slide != 0 ? <Button onClick={handlePrevious}>Previous</Button> : null}
        {slide != slides.length - 1 ? <Button onClick={handleNext}>Next</Button> : null}
        <Button onClick={handleClose}>{slide != slides.length - 1 ? 'Skip' : 'Got it'}</Button>
      </DialogActions>
    </Dialog>
  )
}

export default Tour
