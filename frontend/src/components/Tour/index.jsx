import React, { useState } from 'react'
import { createStyles, makeStyles } from '@material-ui/core'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Button from '@material-ui/core/Button'
import CircleIcon from '@material-ui/icons/FiberManualRecord'

import background from '../../assets/tourImages/image 8.png'

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
      top: '0.375em',
      height: '0.5em',
      width: '0.5em',
    },
    icon: {
      height: '0.7em',
      width: '0.7em',
      position: 'relative',
      bottom: '0.125em',
    },
    dialog: {},
    dialogContentBorder: {
      padding: '3em',
      paddingBottom: '0.25em',
      position: 'relative',
      boxSizing: 'border-box',
      border: '10px solid #6DACD5',
      borderBottom: 'none',
    },
    dialogContentNoBorder: {
      padding: '3em',
      paddingBottom: '0.25em',
      position: 'relative',
      boxSizing: 'border-box',
    },
    dialogActions: {
      paddingLeft: '3em',
      paddingRight: '3em',
      paddingBottom: '1em',
    },
    circle: {
      fontSize: '0.8em',
      color: 'gray',
      margin: '0.2em',
      '&:hover': {
        cursor: 'pointer',
      },
    },
    circleContainer: {
      marginRight: 'auto',
      marginTop: '0.3em',
    },
    blueButton: {
      backgroundColor: '#6DACD5',
      border: '2px solid #6DACD5',
      boxSizing: 'border-box',
      color: 'white',
      '&:hover': {
        color: '#6DACD5',
        backgroundColor: 'white',
      },
    },
    grayButton: {
      color: 'gray',
      border: '2px solid transparent',
      boxSizing: 'border-box',
    },
    paperScrollPaper: {
      maxHeight: '41.875em',
      height: '100%',
      maxWidth: '50em',
      width: '100%',
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

  const backgroundStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    padding: 0,
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
      maxWidth={slide === slides.length - 1 ? 'xs' : 'md'}
      className={classes.dialog}
      classes={slide === slides.length - 1 ? null : { paperScrollPaper: classes.paperScrollPaper }}
    >
      <DialogContent
        className={slide === slides.length - 1 ? classes.dialogContentNoBorder : classes.dialogContentBorder}
        style={slide == 0 ? backgroundStyle : null}
      >
        <DialogContentText component="span">{slides[slide]}</DialogContentText>
      </DialogContent>
      <DialogActions className={classes.dialogActions} style={slide != slides.length - 1 ? borderStyle : null}>
        <div className={classes.circleContainer}>
          {slides.map((image, index) => (
            <CircleIcon
              className={classes.circle}
              style={slide === index ? { color: '#333333' } : null}
              onClick={() => {
                setSlide(index)
              }}
            />
          ))}
        </div>
        <Button className={slide === slides.length - 1 ? classes.blueButton : classes.grayButton} onClick={handleClose}>
          {slide === slides.length - 1 ? 'Got it' : 'Skip'}
        </Button>
        {slide != slides.length - 1 ? (
          <Button className={classes.blueButton} onClick={handleNext}>
            Next
          </Button>
        ) : null}
      </DialogActions>
    </Dialog>
  )
}

export default Tour
