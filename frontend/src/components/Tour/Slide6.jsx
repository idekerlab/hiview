import React from 'react'

import { createStyles, makeStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import HelpIcon from '@material-ui/icons/HelpOutlineOutlined'

import imageA from '../../assets/tourImages/Frame 7.gif'

const useStyles = makeStyles(theme =>
  createStyles({
    imageContainer: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
    image: {
      width: '33.7747598vh',
      //width: '22em',
      margin: '0.5em 0 2em',
    },
    heading: {
      fontWeight: 500,
      marginBottom: '0.75em',
      whiteSpace: 'nowrap',
      display: 'inline-block',
    },
    icon: {
      top: '0.25rem',
      position: 'relative',
    },
  }),
)

const Slide6 = () => {
  const classes = useStyles()

  return (
    <>
      <div className={classes.imageContainer}>{<img src={imageA} className={classes.image} />}</div>
      <Typography
        component="div"
        variant="h5"
        color="textPrimary"
        className={classes.heading}
        style={{ fontSize: '3.13953488vh' }}
      >
        To take this tour again,
      </Typography>
      <Typography color="textPrimary" style={{ fontSize: '2.09302326vh', marginBottom: '1em' }}>
        Click the <HelpIcon color="secondary" className={classes.icon} /> button. Or, access the HiView User Guide for
        more detailed documentation.
      </Typography>
    </>
  )
}

export default Slide6
