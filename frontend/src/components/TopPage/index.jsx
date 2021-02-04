import React, { useState } from 'react'
import 'typeface-roboto'

import SourceSelector from './SourceSelector'

import { makeStyles } from '@material-ui/core/styles'
import { browserHistory } from 'react-router'

import { grey } from '@material-ui/core/colors'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { Tooltip, Button } from '@material-ui/core'

import HelpIcon from '@material-ui/icons/HelpOutline'
import IconButton from '@material-ui/core/IconButton'
import GitHubIcon from '../../assets/images/github-white.svg'
import Tour from '../Tour'

import * as examples from './examples.json'

const useStyles = makeStyles({
  container: {
    width: '100%',
    height: '100%',
  },
  outerContainer: {
    width: '100%',
    height: `calc(100% - 3.5em - 3em)`, //for header and footer
    //margin: 'auto',
    background: '#FFFFFF',
    //display: 'flex',
    //flexDirection: 'column',
    overflow: 'scroll',
    position: 'relative',
    top: '3.5em',
    display: 'flex',
  },
  innerContainer: {
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    width: '45em',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bar: {
    background: '#333333',
    height: '3.5em',
    minHeight: '3.5em',
  },
  toolbar: {
    minHeight: '3.5em',
    height: '3.5em',
  },
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
    justifyContent: 'center',
  },
  h1: {
    color: '#222222',
    fontWeight: 400,
    fontSize: '12em',
    lineHeight: '0.8',
  },
  h3: {
    color: '#777777',
    fontWeight: 300,
    fontSize: '1.5em',
    paddingLeft: '0.6em',
  },
  noDecoration: {
    textDecoration: 'none',
    color: 'inherit',
  },
  logo: {
    width: '2em',
    height: '2em',
  },
  barButtons: {
    position: 'fixed',
    right: '1em',
  },
  queryExamplePanel: {
    width: '100%',
    paddingTop: '3em',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  queryExamples: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#00A1DE',
  },
  queryExampleButton: {
    fontSize: '1.25em',
    margin: '0.75em',
  },
  tourText: {
    color: 'blue',
    fontWeight: 500,
    '&:hover': {
      cursor: 'pointer',
    },
  },
})

const version = '2.7'

const handleClickGh = () => {
  window.open('https://github.com/idekerlab/hiview')
}

const handleClickHelp = () => {
  window.open('https://github.com/idekerlab/hiview/blob/master/README.md')
}

const TopPage = props => {
  const classes = useStyles()
  const [tourOpen, setTourOpen] = useState(false)
  const EXAMPLES = examples.default.examples

  const handleExample = index => {
    const serverUrl = EXAMPLES[index].server
    const serverType = EXAMPLES[index].serverType
    const uuid = EXAMPLES[index].uuid

    props.networkActions.setUuid(uuid)
    props.networkActions.setServer(serverUrl)

    // Encode parameters in URL
    const newUrl = `/${uuid}?type=${serverType}&server=${serverUrl}`
    browserHistory.push(newUrl)
  }

  return (
    <div className={classes.container}>
      <AppBar position="fixed" className={classes.bar}>
        <Toolbar classes={{ root: classes.toolbar }}>
          <Typography variant="h4" color="inherit">
            HiView {version}
          </Typography>

          <div className={classes.barButtons}>
            <IconButton onClick={handleClickHelp}>
              <HelpIcon style={{ color: 'white', width: '2em', height: '2em' }} />
            </IconButton>
            <IconButton onClick={handleClickGh}>
              <img src={GitHubIcon} className={classes.logo} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      <div className={classes.outerContainer}>
        <div className={classes.innerContainer}>
          <div style={{ marginTop: '1em' }}>
            <Typography variant="h1" className={classes.h1}>
              HiView
            </Typography>
            <Typography variant="h3" className={classes.h3}>
              Universal browser for hierarchical data
            </Typography>
          </div>

          <div style={{ width: '45em', maxWidth: '90vw', margin: '4em 0' }}>
            <Typography style={{ fontSize: '1.2em', textAlign: 'justify' }}>
              HiView is a web-based tool for visualizing hierarchical models and the underlying interaction data that
              support them. In hierarchical models, biological entities are grouped in systems and their subsystems
              across multiple scales.
            </Typography>
            <br />
            <Typography style={{ fontSize: '1.2em' }}>
              HiView is integrated with popular tools used in Systems Biology, such as{' '}
              <a href="https://cytoscape.org/" target="_blank" rel="noopener noreferrer">
                Cytoscape
              </a>
              ,{' '}
              <a href="http://ndexbio.org/#/" target="_blank" rel="noopener noreferrer">
                NDEx
              </a>
              ,{' '}
              <a href="http://iquery.ndexbio.org/" target="_blank" rel="noopener noreferrer">
                IQuery
              </a>
              ,{' '}
              <a href="https://www.genecards.org/" target="_blank" rel="noopener noreferrer">
                GeneCards
              </a>
              , and{' '}
              <a href="https://maayanlab.cloud/Enrichr/" target="_blank" rel="noopener noreferrer">
                Enrichr
              </a>
              . For additional information, please{' '}
              <span
                className={classes.tourText}
                onClick={() => {
                  setTourOpen(true)
                }}
              >
                Take the HiView Tour
              </span>{' '}
              and refer to the HiView{' '}
              <a
                href="https://github.com/idekerlab/hiview/blob/master/README.md"
                target="_blank"
                rel="noopener noreferrer"
              >
                Overview
              </a>{' '}
              and{' '}
              <a
                href="https://github.com/idekerlab/hiview/wiki/HiView-User-Guide"
                target="_blank"
                rel="noopener noreferrer"
              >
                User Guide
              </a>
              .
            </Typography>
          </div>

          <SourceSelector {...props} />
          <div className={classes.queryExamplePanel}>
            <Typography align={'center'} variant={'h5'} component="div">
              Example hierarchies:
            </Typography>

            <div className={classes.queryExamples}>
              {EXAMPLES.map((example, index) => {
                return (
                  <div key={example.name}>
                    <Tooltip
                      title={
                        <div style={{ textAlign: 'center', fontSize: '2em', lineHeight: '1.2', fontWeight: '300' }}>
                          {example.description}
                        </div>
                      }
                      placement="bottom"
                    >
                      <Button
                        className={classes.queryExampleButton}
                        color="inherit"
                        onClick={() => handleExample(index)}
                      >
                        {example.name}
                      </Button>
                    </Tooltip>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <Tour open={tourOpen} setOpen={setTourOpen} />

      <footer className={classes.footer}>
        <a className={classes.noDecoration} href="https://github.com/idekerlab/hiview" target="_blank">
          &copy; 2017-2020 University of California, San Diego Trey Ideker Lab
        </a>
      </footer>
    </div>
  )
}

export default TopPage
