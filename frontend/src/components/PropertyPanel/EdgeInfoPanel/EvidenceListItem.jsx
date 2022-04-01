import React, { useState, useEffect } from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import ExpandLess from '@material-ui/icons/ArrowDropDown'
import ExpandMore from '@material-ui/icons/ArrowRight'
import Collapse from '@material-ui/core/Collapse'

import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import OpenLinkIcon from '@material-ui/icons/OpenInNew'

import {
  Typography,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core'
import { parseProps } from '../../../utils/edge-prop-util'

// This is the special key value for encoded string
export const NDEX_EVIDENCE_KEY = 'ndex:evidence'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    minHeight: '10em',
    backgroundColor: theme.palette.background.default,
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
  },
  inline: {
    // width: '4em'
  },
  item2: {
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    paddingLeft: theme.spacing(1),
  },
  nested: {
    paddingLeft: theme.spacing(7),
  },
}))

/**
 *
 * Panel to display edge details
 *
 * @param {*} param0
 * @returns
 */
const EvidenceListItem = ({ evidence }) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <React.Fragment>
      <ListItem button onClick={handleClick}>
        {open ? <ExpandLess /> : <ExpandMore />}
        <div className={classes.item2}>
          <Typography
            variant="subtitle1"
            className={classes.inline}
            color="textPrimary"
          >
            {`feature: ${evidence.feature}`}
          </Typography>
          <Typography
            variant="subtitle2"
            className={classes.inline}
            color="textSecondary"
          >
            {`Class: ${evidence.class}`}
          </Typography>
        </div>
        <div className={classes.item}>
          <ListItemText>
            <Typography
              variant="subtitle1"
              className={classes.inline}
              color="textPrimary"
            >
              {`Shap: ${evidence.shap}`}
            </Typography>
          </ListItemText>
          <ListItemText>
            <Typography
              variant="subtitle1"
              className={classes.inline}
              color="textPrimary"
            >
              {`Z-Score: ${evidence['z-score']}`}
            </Typography>
          </ListItemText>
        </div>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List dense={true} component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemText
              primary="Description:"
              secondary={
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
              }
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="comments">
                <OpenLinkIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Collapse>
    </React.Fragment>
  )
}

export default EvidenceListItem
