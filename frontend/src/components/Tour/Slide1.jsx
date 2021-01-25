import React, { useState, useEffect } from 'react'

import { createStyles, makeStyles, withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import MuiAccordion from '@material-ui/core/Accordion'
import MuiAccordionSummary from '@material-ui/core/AccordionSummary'

import imageA from '../../assets/tourImages/Frame 2a.png'
import imageB from '../../assets/tourImages/Frame 2b.png'
import imageC from '../../assets/tourImages/Frame 2c.png'
import imageD from '../../assets/tourImages/Frame 2d.png'

const useStyles = makeStyles(theme =>
  createStyles({
    imageContainer: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
    image: {
      height: '20em',
      margin: '0em 1em 1em',
    },
    textContainer: {
      marginBottom: '1em',
    },
    heading: {
      fontWeight: 500,
    },
    subHeading: {
      margin: '1em',
      marginTop: 0,
    },
  }),
)

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    margin: '0 1em',
    boxSizing: 'border-box',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: '0 1em',
    },
  },
  expanded: {},
})(MuiAccordion)

const AccordionSummary = withStyles({
  root: {
    marginBottom: -1,
    minHeight: 0,
    '&$expanded': {
      minHeight: 0,
    },
    '&:hover': {
      backgroundColor: '#FAFAB9',
    },
  },
  content: {
    margin: '0.375em 0',
    '&$expanded': {
      margin: '0.375em 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary)

const Slide1 = () => {
  const classes = useStyles()
  const [currentDisplay, setCurrentDisplay] = useState(0)
  const [rotateDisplay, setRotateDisplay] = useState(true)
  const images = [
    <img src={imageA} className={classes.image} />,
    <img src={imageB} className={classes.image} />,
    <img src={imageC} className={classes.image} />,
    <img src={imageD} className={classes.image} />,
  ]

  useEffect(() => {
    if (rotateDisplay) {
      const loop = setTimeout(() => {
        if (currentDisplay === images.length - 1) {
          setCurrentDisplay(0)
        } else {
          setCurrentDisplay(currentDisplay + 1)
        }
      }, 2000)
      return () => clearTimeout(loop)
    }
  }, [currentDisplay])

  const hoverStyle = {
    backgroundColor: '#FAFAB9',
  }

  return (
    <>
      <div
        className={classes.imageContainer}
        onMouseEnter={() => {
          if (!rotateDisplay) {
            setRotateDisplay(true)
            setCurrentDisplay(1)
          }
        }}
      >
        {images[currentDisplay]}
      </div>
      <div className={classes.textContainer}>
        <Typography variant="h5" color="textPrimary" className={classes.heading}>
          HiView has 3 sections
        </Typography>
        <Typography className={classes.subHeading} color="textPrimary">
          Hover over the boxes to see what's in them
        </Typography>
        <Accordion
          onMouseEnter={() => {
            setCurrentDisplay(1)
            setRotateDisplay(false)
          }}
          onMouseLeave={() => {
            setCurrentDisplay(0)
          }}
        >
          <AccordionSummary style={rotateDisplay && currentDisplay == 1 ? hoverStyle : null}>
            <Typography>
              <strong>Model view</strong>: Where the hierarchy is displayed as nested circles. Circles represent genes
              or systems, which can contain subsystems and more genes.
            </Typography>
          </AccordionSummary>
        </Accordion>
        <Accordion
          onMouseEnter={() => {
            setCurrentDisplay(2)
            setRotateDisplay(false)
          }}
          onMouseLeave={() => {
            setCurrentDisplay(0)
          }}
        >
          <AccordionSummary style={rotateDisplay && currentDisplay == 2 ? hoverStyle : null}>
            <Typography>
              <strong>Data view</strong>: Where details about systems and genes are displayed.
            </Typography>
          </AccordionSummary>
        </Accordion>
        <Accordion
          onMouseEnter={() => {
            setCurrentDisplay(3)
            setRotateDisplay(false)
          }}
          onMouseLeave={() => {
            setCurrentDisplay(0)
          }}
        >
          <AccordionSummary style={rotateDisplay && currentDisplay == 3 ? hoverStyle : null}>
            <Typography>
              <strong>Search and settings bar</strong>: Where you can search for systems and genes and adjust settings.
            </Typography>
          </AccordionSummary>
        </Accordion>
      </div>
    </>
  )
}

export default Slide1
