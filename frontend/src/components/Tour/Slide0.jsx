import React, { useState } from 'react'
import { createStyles, makeStyles, withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import MuiAccordion from '@material-ui/core/Accordion'
import MuiAccordionSummary from '@material-ui/core/AccordionSummary'
import MuiAccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import image from '../../assets/tourImages/Frame 1.png'

const useStyles = makeStyles(theme =>
  createStyles({
    image: {
      height: '22em',
      margin: '0',
    },
    imageContainer: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      left: 0,
    },
    heading: {
      fontWeight: 500,
      marginBottom: '1em',
      textAlign: 'center',
    },
  }),
)

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    margin: '1em 0',
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: '1em 0',
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
  },
  content: {
    margin: '6px 0',
    '&$expanded': {
      margin: '6px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary)

const AccordionDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    paddingBottom: 0,
  },
}))(MuiAccordionDetails)

const Slide0 = props => {
  const classes = useStyles()

  return (
    <>
      <div
        style={{
          color: 'white',
          fontWeight: 500,
          textAlign: 'center',
          maxWidth: '100%',
          width: '960px',
          height: '60%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          top: 0,
          boxSizing: 'border-box',
        }}
      >
        <Typography variant="h1" style={{ fontWeight: '500' }}>
          Welcome to {<br />}HiView!{' '}
        </Typography>
      </div>
      <div
        style={{
          maxWidth: '100%',
          backgroundColor: 'white',
          minHeight: '40%',
          position: 'relative',
          bottom: 0,
          padding: '2em 4em 0',
          boxSizing: 'border-box',
        }}
      >
        <Typography variant="h5" color="textPrimary" className={classes.heading}>
          What is HiView?
        </Typography>
        <Typography color="textPrimary">
          HiView is a web-application for visualizing and analyzing hierarchical network models. Genes are organized in
          systems and represented as nested circles.
        </Typography>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>
              Learn more about <strong>hierarchical models</strong>.
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Hierarchical models provide effective abstraction of data in many scientific fields. The main feature of
              hierarchical models is nesting: elements of the model (often genes) are grouped into subsystems, which are
              organized into larger and larger systems. A gene or a subsystem can be part of more than one larger
              system.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
      {/*}
      <div className={classes.imageContainer}>
        <img src={image} className={classes.image} />
      </div>

      

      <Typography component="div" variant="h5" color="textPrimary" className={classes.heading}>
        What is HiView?
      </Typography>

      <Typography color="textPrimary">
        HiView is a web-application for visualizing and analyzing hierarchical network models. Genes are organized in
        systems and represented as nested circles.
      </Typography>
      <Accordion
        onMouseEnter={() => {
          setCurrentDisplay(1)
        }}
        onMouseLeave={() => {
          setCurrentDisplay(0)
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>
            Learn more about <strong>hierarchical models</strong>.
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Hierarchical models provide effective abstraction of data in many scientific fields. The main feature of
            hierarchical models is nesting: elements of the model (often genes) are grouped into subsystems, which are
            organized into larger and larger systems. A gene or a subsystem can be part of more than one larger system.
          </Typography>
        </AccordionDetails>
      </Accordion>*/}
    </>
  )
}

export default Slide0
