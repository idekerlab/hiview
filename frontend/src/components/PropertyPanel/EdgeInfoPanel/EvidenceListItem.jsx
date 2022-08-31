import React, { useState, useEffect } from 'react'
import { ListItem, ListItemText, Popover, Collapse } from '@material-ui/core'

import ExpandLess from '@material-ui/icons/ArrowDropDown'
import ExpandMore from '@material-ui/icons/ArrowRight'

import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'

import DOMPurify from 'dompurify'
import parse from 'html-react-parser'

import { Typography } from '@material-ui/core'
import PathNetworkPanel from './PathNetworkPanel'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    minHeight: '10em',
    backgroundColor: theme.palette.background.paper,
  },
  item: {
    borderTop: '1px solid #bbbbbb',
    height: '5em',
  },
  inline: {
    height: '1.2em',
  },
  item2: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    paddingLeft: theme.spacing(7),
  },
  nested: {
    paddingLeft: theme.spacing(14),
  },
  popover: {
    // pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
    width: '25em',
  },
  popupContent: {
    padding: 0,
    margin: 0,
  },
}))

/**
 *
 * Panel to display edge details
 *
 * @param {*} param0
 * @returns
 */
const EvidenceListItem = ({ evidence, selectedEdge, queryPaths }) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [keepOpened, setKeepOpened] = useState(true)
  const [pointerEvents, setPointerEvents] = useState('none')
  const [anchorEl, setAnchorEl] = useState(null)

  const handlePopoverOpen = (event) => {
    if(!open) {
      setAnchorEl(event.currentTarget)
    }
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
    setPointerEvents('none')
    setKeepOpened(false)
  }

  const handleEnterPopover = () => {
    setPointerEvents('auto')
    setKeepOpened(true)
  }

  const handleLeavePopover = () => {
    setPointerEvents('none')
    setAnchorEl(null)
    setKeepOpened(false)
  }
  const openPopover = Boolean(anchorEl)
  const { feature, feature_unit } = evidence

  const handleClick = () => {
    setOpen(!open)
  }

  let description = 'N/A'
  try {
    if (evidence.description !== undefined) {
      description = DOMPurify.sanitize(evidence.description, {
        USE_PROFILES: { html: true },
      })
    }
  } catch (err) {
    console.warn('Description text is invalid.')
  }

  let network = null
  if (queryPaths !== undefined) {
    network = queryPaths.paths.get(feature)
  }
  if (queryPaths.loading) {
    network = null
  }

  const popoverId = `description-popover-${feature}`
  return (
    <React.Fragment>
      <ListItem className={classes.item} button onClick={handleClick}>
        {open ? <ExpandLess /> : <ExpandMore />}
        <div className={classes.item2}>
          <Typography
            aria-owns={open ? popoverId : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
            onClick={handlePopoverClose}
            variant="h6"
            color="textPrimary"
          >
            {feature}
          </Typography>
          <Popover
            transitionDuration={0}
            id={popoverId}
            className={classes.popover}
            classes={{
              paper: classes.paper,
            }}
            open={openPopover}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            onClose={handlePopoverClose}
            style={{ pointerEvents: pointerEvents }}
          >
            <div
              className={classes.popupContent}
              onMouseEnter={handleEnterPopover}
              onMouseLeave={handleLeavePopover}
            >
              <Typography variant="body1">{parse(description)}</Typography>
              <Typography variant="body2">{'(Click to open full details)'}</Typography>
            </div>
          </Popover>
        </div>
        <div>
          <ListItemText>
            <Typography
              variant="subtitle2"
              className={classes.inline}
              color="textPrimary"
            >
              {`Feature Score: ${evidence['z-score']} (Unit: ${feature_unit})`}
            </Typography>
          </ListItemText>
          <ListItemText>
            <Typography
              variant="subtitle2"
              className={classes.inline}
              color="textPrimary"
            >
              {`SHAP: ${evidence.shap}`}
            </Typography>
          </ListItemText>
        </div>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem className={classes.nested}>
            <ListItemText
              primary="Description:"
              secondary={parse(description)}
            />
          </ListItem>
          <ListItem className={classes.nested}>
            {network === null || network === undefined ? (
              <div />
            ) : (
              <PathNetworkPanel
                network={network}
                node1={selectedEdge.source}
                node2={selectedEdge.target}
                uuid={evidence['interactome_uuid']}
              />
            )}
          </ListItem>
        </List>
      </Collapse>
    </React.Fragment>
  )
}

export default EvidenceListItem
