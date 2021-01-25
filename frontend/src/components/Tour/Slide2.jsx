import React, { useState } from 'react'
import { createStyles, makeStyles, withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import MuiAccordion from '@material-ui/core/Accordion'
import MuiAccordionSummary from '@material-ui/core/AccordionSummary'

import imageA from '../../assets/tourImages/Frame 3a.png'
import imageB2 from '../../assets/tourImages/Frame 3b2.gif'
import imageB1 from '../../assets/tourImages/Frame 3b1.gif'
import imageC1 from '../../assets/tourImages/Frame 3c1.gif'
import imageC2 from '../../assets/tourImages/Frame 3c2.gif'
import imageD1 from '../../assets/tourImages/Frame 3d1.gif'
import imageD2 from '../../assets/tourImages/Frame 3d2.gif'
import imageE1 from '../../assets/tourImages/Frame 3e1.gif'
import imageE2 from '../../assets/tourImages/Frame 3e2.gif'

const useStyles = makeStyles(theme =>
  createStyles({
    image: {
      height: '20em',
      margin: '0em 1em 1em',
    },
    imageContainer: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
    heading: {
      fontWeight: 500,
      marginBottom: '0.75em',
    },
  }),
)

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    margin: '0 1em',
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
    margin: '6px 0',
    '&$expanded': {
      margin: '6px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary)

const Slide1 = props => {
  const classes = useStyles()
  const [currentDisplay, setCurrentDisplay] = useState(0)
  const images = [
    <img src={imageA} className={classes.image} />,
    <img src={imageB1} className={classes.image} />,
    <img src={imageB2} className={classes.image} />,
    <img src={imageC1} className={classes.image} />,
    <img src={imageC2} className={classes.image} />,
    <img src={imageD1} className={classes.image} />,
    <img src={imageD2} className={classes.image} />,
    <img src={imageE1} className={classes.image} />,
    <img src={imageE2} className={classes.image} />,
  ]

  return (
    <>
      <div className={classes.imageContainer}>{images[currentDisplay]}</div>
      <div>
        <Typography component="div" variant="h5" color="textPrimary" className={classes.heading}>
          Model view
        </Typography>
        <Accordion
          onMouseEnter={() => {
            if (currentDisplay == 1) {
              setCurrentDisplay(2)
            } else {
              setCurrentDisplay(1)
            }
          }}
        >
          <AccordionSummary>
            <Typography>
              <strong>Hover</strong> over a circle to highlight its members in the <strong>Data view</strong>.
            </Typography>
          </AccordionSummary>
        </Accordion>
        <Accordion
          onMouseEnter={() => {
            if (currentDisplay == 3) {
              setCurrentDisplay(4)
            } else {
              setCurrentDisplay(3)
            }
          }}
        >
          <AccordionSummary>
            <Typography>
              <strong>Double click</strong> a circle to view its subsystems and open information in the{' '}
              <strong>Data view</strong>.
            </Typography>
          </AccordionSummary>
        </Accordion>
        <Accordion
          onMouseEnter={() => {
            if (currentDisplay == 5) {
              setCurrentDisplay(6)
            } else {
              setCurrentDisplay(5)
            }
          }}
        >
          <AccordionSummary>
            <Typography>
              <strong>Click and drag</strong> to pan across the <strong>Model view</strong>.
            </Typography>
          </AccordionSummary>
        </Accordion>
        <Accordion
          onMouseEnter={() => {
            if (currentDisplay == 7) {
              setCurrentDisplay(8)
            } else {
              setCurrentDisplay(7)
            }
          }}
        >
          <AccordionSummary>
            <Typography>
              <strong>Scroll</strong> to zoom in and out using your mouse wheel or multi-finger touchpad.
            </Typography>
          </AccordionSummary>
        </Accordion>
      </div>
    </>
  )
}

export default Slide1
