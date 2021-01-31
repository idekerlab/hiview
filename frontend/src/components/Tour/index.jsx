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
    dialogContentBorder: {
      padding: '3.13953488vh 3em 0.25em',
      position: 'relative',
      boxSizing: 'border-box',
      border: '10px solid #6DACD5',
      borderBottom: 'none',
      '&:first-child': {
        paddingTop: '3.13953488vh',
      },
    },
    dialogContentNoBorder: {
      padding: '3em',
      paddingBottom: '0.25em',
      position: 'relative',
      boxSizing: 'border-box',
      border: '10px solid white',
    },
    dialogActionsBorder: {
      paddingLeft: '3em',
      paddingRight: '3em',
      paddingBottom: '1em',
      borderRightColor: 'rgb(109, 172, 213)',
      borderRightStyle: 'solid',
      borderRightWidth: '10px',
      borderBottomColor: 'rgb(109, 172, 213)',
      borderBottomStyle: 'solid',
      borderBottomWidth: '10px',
      borderLeftColor: 'rgb(109, 172, 213)',
      borderLeftStyle: 'solid',
      borderLeftWidth: '10px',
    },
    dialogActionsNoBorder: {
      paddingLeft: '3em',
      paddingRight: '3em',
      paddingBottom: '1em',
      borderRightColor: 'white',
      borderRightStyle: 'solid',
      borderRightWidth: '10px',
      borderBottomColor: 'white',
      borderBottomStyle: 'solid',
      borderBottomWidth: '10px',
      borderLeftColor: 'white',
      borderLeftStyle: 'solid',
      borderLeftWidth: '10px',
    },
    circle: {
      fontSize: '1.6744186vh',
      color: 'rgb(202, 202, 202)',
      margin: '0.2em',
      '&:hover': {
        cursor: 'pointer',
      },
    },
    circleContainerFirstPage: {
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      float: 'left',
      position: 'relative',
      left: '50%',
    },
    circleContainerInnerFirstPage: {
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      float: 'left',
      left: '-50%',
    },
    circleContainer: {
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
    circleContainerInner: {
      display: 'flex',
      alignItems: 'center',
    },
    navigationContainer: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      height: '100%',
    },
    navigationButtonsContainerFirstPage: { width: '37vh', display: 'inline-block', height: '100%' },
    navigationButtonsContainer: { width: '37vh', display: 'inline-block', textAlign: 'center', height: '100%' },
    navigationButtonsContainerLastPage: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    nextButton: {
      backgroundColor: '#6DACD5',
      border: '2px solid #6DACD5',
      boxSizing: 'border-box',
      color: 'white',
      fontSize: '1.83139535vh',
      padding: '0.209302326vh 0',
      minWidth: '8.37209304vh',
      float: 'right',
      marginLeft: '1em',
      '&:hover': {
        color: '#6DACD5',
        backgroundColor: 'white',
      },
    },
    skipButtonContainer: {
      position: 'absolute',
      right: '3em',
    },
    skipButton: {
      color: 'gray',
      border: '2px solid transparent',
      boxSizing: 'border-box',
      fontSize: '1.83139535vh',
      padding: '0.209302326vh 0',
      width: '8.37209304vh',
      float: 'right',
    },
    backButton: {
      backgroundColor: '#6DACD5',
      border: '2px solid #6DACD5',
      boxSizing: 'border-box',
      color: 'white',
      fontSize: '1.83139535vh',
      padding: '0.209302326vh 0',
      minWidth: '8.37209304vh',
      '&:hover': {
        color: '#6DACD5',
        backgroundColor: 'white',
      },
      float: 'left',
      marginRight: '1em',
    },
    paperScrollPaper: {
      height: '90vh',
      width: '105vh',
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

  const handlePrevious = () => {
    setSlide(slide - 1)
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

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      onEnter={handleOpen}
      maxWidth={slide !== slides.length - 1 ? 'xl' : 'xs'}
      className={classes.dialog}
      classes={slide === slides.length - 1 ? null : { paperScrollPaper: classes.paperScrollPaper }}
    >
      <DialogContent
        className={slide !== slides.length - 1 ? classes.dialogContentBorder : classes.dialogContentNoBorder}
        style={slide == 0 ? backgroundStyle : null}
      >
        <DialogContentText component="span">{slides[slide]}</DialogContentText>
      </DialogContent>
      <DialogActions
        className={slide !== slides.length - 1 ? classes.dialogActionsBorder : classes.dialogActionsNoBorder}
      >
        <div className={classes.navigationContainer}>
          {slide === 0 ? (
            <>
              <div className={classes.navigationButtonsContainerFirstPage}>
                <div className={classes.circleContainerFirstPage}>
                  <div className={classes.circleContainerInnerFirstPage}>
                    {slides.map((image, index) => (
                      <CircleIcon
                        key={index}
                        className={classes.circle}
                        style={slide === index ? { color: 'rgb(75, 75, 75)' } : null}
                        onClick={() => {
                          setSlide(index)
                        }}
                      />
                    ))}
                  </div>
                </div>
                <Button className={classes.nextButton} onClick={handleNext}>
                  Next
                </Button>
              </div>
              <div className={classes.skipButtonContainer}>
                <Button className={classes.skipButton} onClick={handleClose}>
                  Skip
                </Button>
              </div>
            </>
          ) : slide !== slides.length - 1 ? (
            <>
              <div className={classes.navigationButtonsContainer}>
                <Button className={classes.backButton} onClick={handlePrevious}>
                  Back
                </Button>
                <div className={classes.circleContainer}>
                  <div className={classes.circleContainerInner}>
                    {slides.map((image, index) => (
                      <CircleIcon
                        key={index}
                        className={classes.circle}
                        style={slide === index ? { color: 'rgb(75, 75, 75)' } : null}
                        onClick={() => {
                          setSlide(index)
                        }}
                      />
                    ))}
                  </div>
                </div>
                <Button className={classes.nextButton} onClick={handleNext}>
                  Next
                </Button>
              </div>
              <div className={classes.skipButtonContainer}>
                <Button className={classes.skipButton} onClick={handleClose}>
                  Skip
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className={classes.navigationButtonsContainerLastPage}>
                <Button className={classes.backButton} onClick={handlePrevious}>
                  Back
                </Button>
                <div className={classes.circleContainer}>
                  <div className={classes.circleContainerInner}>
                    {slides.map((image, index) => (
                      <CircleIcon
                        key={index}
                        className={classes.circle}
                        style={slide === index ? { color: 'rgb(75, 75, 75)' } : null}
                        onClick={() => {
                          setSlide(index)
                        }}
                      />
                    ))}
                  </div>
                </div>
                <Button className={classes.nextButton} onClick={handleClose}>
                  Got It!
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogActions>
    </Dialog>
  )
}

export default Tour
