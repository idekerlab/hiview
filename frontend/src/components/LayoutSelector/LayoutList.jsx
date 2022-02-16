import React from 'react'
import {
  MenuItem,
  FormControl,
  Select,
} from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core'

const LAYOUTS = {
  PRESET: 'preset',
  COSE: 'cose-bilkent',
  GRID: 'grid',
  CIRCLE: 'circle',
  COCENTRIC: 'concentric',
  BREADTHFIRST: 'breadthfirst',
}

const useStyles = makeStyles((theme) =>
  createStyles({
    formControl: {
      width: '100%',
      flexGrow: 1,
      margin: '0.2em',
    },
    select: {
      paddingLeft: '0.2em',
    }
  })
)

const LayoutList = ({ layout, handleChange }) => {
  const classes = useStyles()
  
  return (
    <FormControl className={classes.formControl}>
      <Select
        fullWidth
        value={layout}
        onChange={handleChange('layout')}
        className={classes.select}
      >
        <MenuItem value={LAYOUTS.COSE}>COSE (Force-Directed)</MenuItem>
        <MenuItem value={LAYOUTS.GRID}>Grid</MenuItem>
        <MenuItem value={LAYOUTS.CIRCLE}>Circle</MenuItem>
        <MenuItem value={LAYOUTS.COCENTRIC}>Cocentric</MenuItem>
        <MenuItem value={LAYOUTS.BREADTHFIRST}>Breadthfirst</MenuItem>
      </Select>
    </FormControl>
  )
}

export { LAYOUTS }
export default LayoutList
