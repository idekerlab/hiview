import React from 'react'

import { createStyles, makeStyles, withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import MuiAccordion from '@material-ui/core/Accordion'
import MuiAccordionSummary from '@material-ui/core/AccordionSummary'
import MuiAccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles(theme =>
  createStyles({
    titleContainer: {
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
    },
    title: {
      fontWeight: 500,
    },
    textContainer: {
      maxWidth: '100%',
      backgroundColor: 'white',
      minHeight: '40%',
      position: 'relative',
      bottom: 0,
      padding: '2em 4em 1em',
      boxSizing: 'border-box',
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

const Slide0 = () => {
  const classes = useStyles()

  return (
    <>
      <div className={classes.titleContainer}>
        <Typography variant="h1" className={classes.title}>
          Welcome to {<br />}HiView!
        </Typography>
      </div>
      <div className={classes.textContainer}>
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
    </>
  )
}

export default Slide0
