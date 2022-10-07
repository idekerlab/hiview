import React from 'react'
import {
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
  Tooltip,
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

import { NODE_STYLE } from '../../../reducers/ui-state'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    color: '#AAAAAA',
    '& > * + *': {
      marginTop: theme.spacing(1),
    },
    padding: theme.spacing(2),
  },
  label: {
    color: '#666666',
    // fontSize: '1.5em',
    fontWeight: 500,
  },
  title: {
    padding: 0,
    margin: 0,
  },
  row: {
    display: 'flex',
    alignItems: 'center',
  },
}))

const TOOLTIIP_TEXT = {
  [NODE_STYLE.CURATION]:
    'Proteins are colored orange when found in systematic lists describing DNA damage repair',
  [NODE_STYLE.DOMINANT_EVIDENCE]: 'Dominant evidence class (Coabundance, Codependency, Coexpression, Physical) for a given protein calculated by choosing evidence class with highest cumulative score'
}

const NodeStyleSelector = ({ uiState, uiStateActions }) => {
  const classes = useStyles()
  const selection = uiState.get('nodeStyle')

  const handleChange = (event) => {
    const newSelection = event.target.value
    uiStateActions.setNodeStyle(newSelection)
  }

  const getFormControlLabel = (styleName) => (
    <FormControlLabel
      className={classes.label}
      key={styleName}
      value={NODE_STYLE[styleName]}
      control={<Radio />}
      label={<Typography variant={'body1'}>{NODE_STYLE[styleName]}</Typography>}
    />
  )

  return (
    <FormControl component="fieldset" className={classes.root}>
      <FormLabel className={classes.title} component="legend">
        {<Typography variant="h6">Node Coloring:</Typography>}
      </FormLabel>
      <RadioGroup
        aria-label="node-style"
        name="node-style"
        value={selection}
        onChange={handleChange}
      >
        {Object.keys(NODE_STYLE).map((styleName) => {
          const tooltip = TOOLTIIP_TEXT[NODE_STYLE[styleName]]

          if (tooltip !== undefined) {
            return (
              <div className={classes.row} key={styleName}>
                <Tooltip
                  title={<Typography variant="body1">{tooltip}</Typography>}
                  arrow
                >
                  {getFormControlLabel(styleName)}
                </Tooltip>
              </div>
            )
          } else {
            return getFormControlLabel(styleName)
          }
        })}
      </RadioGroup>
    </FormControl>
  )
}

export default NodeStyleSelector
