import React, { useState } from 'react'

import { createStyles, makeStyles, withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import MuiAccordion from '@material-ui/core/Accordion'
import MuiAccordionSummary from '@material-ui/core/AccordionSummary'

import imageA from '../../assets/tourImages/Frame 4a.png'
import imageB from '../../assets/tourImages/Frame 4b.png'
import imageC from '../../assets/tourImages/Frame 4c.png'
import imageC1 from '../../assets/tourImages/Frame 4c1.png'
import imageC2 from '../../assets/tourImages/Frame 4c2.png'
import imageC3 from '../../assets/tourImages/Frame 4c3.png'
import imageC4 from '../../assets/tourImages/Frame 4c4.png'
import imageD from '../../assets/tourImages/Frame 4d.png'

const useStyles = makeStyles(theme =>
  createStyles({
    image: {
      //height: '35em',
      height: '73.2558141vh',
    },
    imageContainer: {
      display: 'flex',
      margin: 'auto',
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
      margin: 'auto',
    },
    iconContainer: {
      display: 'flex',
      alignItems: 'end',
      height: '100%',
    },
    hiddenLink: {
      textDecoration: 'none',
      color: 'rgba(0, 0, 0, 0.87)',
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
    margin: '0.375em 0',
    '&$expanded': {
      margin: '0.375em 0',
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
    <img src={imageC1} className={classes.image} />,
    <img src={imageC2} className={classes.image} />,
    <img src={imageC3} className={classes.image} />,
    <img src={imageC4} className={classes.image} />,
    <img src={imageD} className={classes.image} />,
  ]

  return (
    <div className={classes.slideContainer}>
      <div className={classes.imageContainer}>{images[currentDisplay]}</div>
      <div className={classes.textContainer}>
        <Typography
          component="div"
          variant="h5"
          color="textPrimary"
          className={classes.heading}
          style={{ fontSize: '3.13953488vh' }}
        >
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
            <Typography style={{ fontSize: '2.09302326vh' }}>
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
            <Typography component="div" style={{ fontSize: '2.09302326vh' }}>
              Use the <strong>Layout panel</strong> to:
              <ul>
                <li
                  onMouseEnter={() => {
                    setCurrentDisplay(3)
                  }}
                  onMouseLeave={() => {
                    setCurrentDisplay(2)
                  }}
                >
                  Change the <strong>layout</strong> of the network.
                </li>
                <li
                  onMouseEnter={() => {
                    setCurrentDisplay(4)
                  }}
                  onMouseLeave={() => {
                    setCurrentDisplay(2)
                  }}
                >
                  Export the network as a <strong>gene set</strong> or <strong>SVG image</strong>.
                </li>
                <li
                  onMouseEnter={() => {
                    setCurrentDisplay(5)
                  }}
                  onMouseLeave={() => {
                    setCurrentDisplay(2)
                  }}
                >
                  Submit the gene set to{' '}
                  <strong>
                    <a
                      href="https://iquery.ndexbio.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={classes.hiddenLink}
                    >
                      IQuery
                    </a>
                  </strong>{' '}
                  for analysis.
                </li>
                <li
                  onMouseEnter={() => {
                    setCurrentDisplay(6)
                  }}
                  onMouseLeave={() => {
                    setCurrentDisplay(2)
                  }}
                >
                  Open the network in{' '}
                  <strong>
                    <a
                      href="https://cytoscape.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={classes.hiddenLink}
                    >
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
            setCurrentDisplay(7)
          }}
          onMouseLeave={() => {
            setCurrentDisplay(0)
          }}
        >
          <AccordionSummary>
            <Typography style={{ fontSize: '2.09302326vh' }}>
              Expand the <strong>Edge Filters</strong> panel to reveal controls for filtering edges by type and score.
            </Typography>
          </AccordionSummary>
        </Accordion>
      </div>
    </div>
  )
}

export default Slide3
