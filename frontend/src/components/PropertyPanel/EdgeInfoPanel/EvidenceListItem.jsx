import React, { useState, useEffect } from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import ExpandLess from '@material-ui/icons/ArrowDropDown'
import ExpandMore from '@material-ui/icons/ArrowRight'
import Collapse from '@material-ui/core/Collapse'

import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import OpenLinkIcon from '@material-ui/icons/OpenInNew'

import Linkify from 'linkify-react'
import DOMPurify from 'dompurify'
import parse from 'html-react-parser'

import {
  Typography,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core'
import { parseProps } from '../../../utils/edge-prop-util'

const DUMMY_TEXT =
  'Konno, N., Kijima, Y., Watano, K. et al. <a href="https://doi.org/10.1038/s41587-021-01111-2">Deep distributed computing to reconstruct extremely large lineage trees</a>. <i>Nat Biotechnol </i>(2022). https://doi.org/10.1038/s41587-021-01111-2&nbsp; [<a href="http://idekerlab.ucsd.edu/wp-content/uploads/2022/01/Konno_NatBiotechnol2022.pdf">PDF</a>]'

const sanitized = DOMPurify.sanitize(DUMMY_TEXT, {
  USE_PROFILES: { html: true },
})

// This is the special key value for encoded string
export const NDEX_EVIDENCE_KEY = 'ndex:evidence'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    minHeight: '10em',
    backgroundColor: theme.palette.background.paper,
  },
  item: {
    borderTop: '1px solid #bbbbbb',
    height: '6em',
  },
  inline: {
    height: '1.2em'
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

const options = {}

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

  return (
    <React.Fragment>
      <ListItem className={classes.item} button onClick={handleClick}>
        {open ? <ExpandLess /> : <ExpandMore />}
        <div className={classes.item2}>
          <Typography
            variant="subtitle1"
            // className={classes.inline}
            color="textPrimary"
          >
            {`feature: ${evidence.feature}`}
          </Typography>
          <Typography
            variant="subtitle2"
            // className={classes.inline}
            color="textSecondary"
          >
            {`Class: ${evidence.class}`}
          </Typography>
        </div>
        <div>
          <ListItemText>
            <Typography
              variant="subtitle1"
              className={classes.inline}
              color="textPrimary"
            >
              {`SHAP: ${evidence.shap}`}
            </Typography>
          </ListItemText>
          <ListItemText>
            <Typography
              variant="subtitle1"
              className={classes.inline}
              color="textPrimary"
            >
              {`Feature Score: ${evidence['z-score']}`}
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
        </List>
      </Collapse>
    </React.Fragment>
  )
}

export default EvidenceListItem
