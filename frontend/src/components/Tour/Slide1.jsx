import React, { useState } from 'react'
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
    <img src={imageB} className={classes.image} />,
    <img src={imageC} className={classes.image} />,
    <img src={imageD} className={classes.image} />,
  ]

  return (
    <>
      <div className={classes.imageContainer}>{images[currentDisplay]}</div>
      <div>
        <Typography component="div" variant="h5" color="textPrimary" className={classes.heading}>
          HiView has 3 sections
        </Typography>
        <Accordion
          onMouseEnter={() => {
            setCurrentDisplay(1)
          }}
          onMouseLeave={() => {
            setCurrentDisplay(0)
          }}
        >
          <AccordionSummary>
            <Typography>
              <strong>Model view</strong>: Where the hierarchy is displayed as nested circles. Circles represent genes
              or systems, which can contain subsystems and more genes.
            </Typography>
          </AccordionSummary>
        </Accordion>
        <Accordion
          onMouseEnter={() => {
            setCurrentDisplay(2)
          }}
          onMouseLeave={() => {
            setCurrentDisplay(0)
          }}
        >
          <AccordionSummary>
            <Typography>
              <strong>Data view</strong>: Where details about systems and genes are displayed.
            </Typography>
          </AccordionSummary>
        </Accordion>
        <Accordion
          onMouseEnter={() => {
            setCurrentDisplay(3)
          }}
          onMouseLeave={() => {
            setCurrentDisplay(0)
          }}
        >
          <AccordionSummary>
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
