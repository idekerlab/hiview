import React from 'react'
import 'typeface-roboto'

import SourceSelector from './SourceSelector'

import { withStyles } from '@material-ui/core/styles'

import { grey } from '@material-ui/core/colors'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

import HelpIcon from '@material-ui/icons/HelpOutline'

import IconButton from '@material-ui/core/IconButton'
import GitHubIcon from '../../assets/images/github-white.svg'


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
    background: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  bar: {
    background: '#333333'
  },
  toolbar: {},
  footer: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    color: grey[800],
    background: grey[100],
    height: '3em',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  h1: {
    color: '#222222',
    fontWeight: 400,
    fontSize: '17em'
  },
  h3: {
    color: '#777777',
    fontWeight: 300,
    fontSize: '2em',
    paddingLeft: '0.5em'
  },
  noDecoration: {
    textDecoration: 'none',
    color: 'inherit'
  },
  logo: {
    width: '2em',
    height: '2em'
  },
  barButtons: {
    position: 'fixed',
    right: '1em'
  }
})

const version = '2.6'

const handleClickGh = () => {
  window.open('https://github.com/idekerlab/hiview')
}

const handleClickHelp = () => {
  window.open('https://github.com/idekerlab/hiview/blob/master/README.md')
}

const TopPage = props => {
  const { classes } = props

  console.log('Top props', props)

  return (
    <div className={classes.container}>
      <AppBar position="fixed" className={classes.bar}>
        <Toolbar className={classes.toolBar}>
          <Typography variant="h4" color="inherit">
            HiView {version}
          </Typography>

          <div className={classes.barButtons}>
            <IconButton onClick={handleClickHelp}>
              <HelpIcon
                style={{ color: 'white', width: '2em', height: '2em' }}
              />
            </IconButton>
            <IconButton onClick={handleClickGh}>
              <img src={GitHubIcon} className={classes.logo} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      <div className={classes.root}>
        <div>
          <Typography variant="h1" className={classes.h1}>
            HiView
          </Typography>
          <Typography variant="h3" className={classes.h3}>
            Universal browser for hierarchical data
          </Typography>
        </div>

        <SourceSelector {...props} />
      </div>

      <footer className={classes.footer}>
        <a
          className={classes.noDecoration}
          href="https://github.com/idekerlab/hiview"
          target="_blank"
        >
          &copy; 2017-2019 University of California, San Diego Trey Ideker Lab
        </a>
      </footer>
    </div>
  )
}

export default withStyles(styles)(TopPage)
