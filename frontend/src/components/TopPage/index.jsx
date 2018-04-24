import React from 'react'
import SourceSelector from './SourceSelector'

import { withStyles } from 'material-ui/styles'

import { blueGrey, grey } from 'material-ui/colors'
import Typography from 'material-ui/Typography'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'

const styles = theme => ({
  container: {
    width: '100%',
    height: '100%'
  },
  root: {
    width: '100%',
    height: '100%',
    margin: 0,
    padding: 0,
    background: blueGrey[50],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  footer: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    color: grey[800],
    background: blueGrey[100],
    height: '3em',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  noDecoration: {
    textDecoration: 'none'
  }
})

const version = '1.0'

const TopPage = props => {
  const { classes } = props

  return (
    <div className={classes.container}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="title" color="inherit">
            HiView v{version} &beta;
          </Typography>
        </Toolbar>
      </AppBar>

      <div className={classes.root}>
        <div>
          <Typography variant="display4" color="primary">
            HiView
          </Typography>
          <Typography variant="headline">
            Universal browser for hierarchical data
          </Typography>
        </div>

        <div>
          <SourceSelector {...props} />
        </div>
      </div>

      <footer className={classes.footer}>
        <a
          className={classes.noDecoration}
          href="https://github.com/idekerlab/hiview"
          target="_blank"
        >
          &copy; 2017-2018 University of California, San Diego Trey Ideker Lab
        </a>
      </footer>
    </div>
  )
}

export default withStyles(styles)(TopPage)
