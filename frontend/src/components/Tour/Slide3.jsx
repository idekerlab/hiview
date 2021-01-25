import React, { useState } from 'react'

import { createStyles, makeStyles, withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import MuiAccordion from '@material-ui/core/Accordion'
import MuiAccordionSummary from '@material-ui/core/AccordionSummary'

import imageA from '../../assets/tourImages/Frame 4a.png'
import imageB from '../../assets/tourImages/Frame 4b.png'
import imageC from '../../assets/tourImages/Frame 4c.png'
import imageD from '../../assets/tourImages/Frame 4d.png'

const useStyles = makeStyles(theme =>
  createStyles({
    image: {
      height: '35em',
    },
    imageContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    heading: {
      fontWeight: 500,
      marginBottom: '0.75em',
      marginLeft: '0.66667em',
    },
    slideContainer: {
      display: 'flex',
      height: '100%',
      width: '100%',
      boxSizing: 'border-box',
    },
    textContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    iconContainer: {
      display: 'flex',
      alignItems: 'end',
      height: '100%',
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
    display: 'flex',
    alignItems: 'flex-end',
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
    display: 'block',
  },
  expanded: {},
})(MuiAccordionSummary)

const Slide3 = () => {
  const classes = useStyles()
  const [currentDisplay, setCurrentDisplay] = useState(0)
  const images = [
    <img src={imageA} className={classes.image} />,
    <img src={imageB} className={classes.image} />,
    <img src={imageC} className={classes.image} />,
    <img src={imageD} className={classes.image} />,
  ]

  return (
    <div className={classes.slideContainer}>
      <div className={classes.imageContainer}>{images[currentDisplay]}</div>
      <div className={classes.textContainer}>
        <Typography component="div" variant="h5" color="textPrimary" className={classes.heading}>
          Data view
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
              The <strong>network diagram</strong> shows the genes, subsystems, and interactions of the currently
              selected system.
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
            <Typography component="div">
              Use the <strong>Layout panel</strong> to:
              <ul>
                <li>
                  Change the <strong>layout</strong> of the network.
                </li>
                <li>
                  Export the network as a <strong>gene set</strong> or <strong>SVG image</strong>.
                </li>
                <li>
                  Submit the gene set to{' '}
                  <strong>
                    <a href="http://iquery.ndexbio.org/" target="_blank" rel="noopener noreferrer">
                      IQuery
                    </a>
                  </strong>{' '}
                  for analysis.
                </li>
                <li>
                  Open the network in{' '}
                  <strong>
                    <a href="https://cytoscape.org/" target="_blank" rel="noopener noreferrer">
                      Cytoscape
                    </a>
                  </strong>{' '}
                  (if it's up and running on your machine).
                </li>
              </ul>
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
              Use the <strong>Edge Filters</strong> panel to filter the edges by type or score.
            </Typography>
          </AccordionSummary>
        </Accordion>
      </div>
    </div>
  )
}

export default Slide3
