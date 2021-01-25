import React from 'react'
import { createStyles, makeStyles, withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import MuiAccordion from '@material-ui/core/Accordion'
import MuiAccordionSummary from '@material-ui/core/AccordionSummary'
import HelpIcon from '@material-ui/icons/HelpOutlineOutlined'

import imageA from '../../assets/tourImages/Frame 7.gif'

const useStyles = makeStyles(theme =>
  createStyles({
    image: {
      width: '22em',
      margin: '0.5em 0 2em',
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
    icon: {
      top: '0.25rem',
      position: 'relative',
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

const Slide6 = props => {
  const classes = useStyles()

  return (
    <>
      <div className={classes.imageContainer}>{<img src={imageA} className={classes.image} />}</div>
      <Typography component="div" variant="h5" color="textPrimary" className={classes.heading}>
        To take this tour again,
      </Typography>
      <Typography color="textPrimary">
        Click the <HelpIcon color="secondary" className={classes.icon} /> button. Or access the HiView User Guide for
        more detailed documentation.
      </Typography>
    </>
  )
}

export default Slide6
