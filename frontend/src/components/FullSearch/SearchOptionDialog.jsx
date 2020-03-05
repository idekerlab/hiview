import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import {SEARCH_MODE} from '../../reducers/ui-state'

const useStyles = makeStyles({
  root: {
    padding: '0'
  },
  title: {
    padding: '2em'
  },
  formControl: {
    padding: '2em',
    paddingTop: 0,
    paddingBottom: 0
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center', 
    padding: '1em'
  },
});

const SearchOptionDialog = (props) => {

  const classes = useStyles()
  const { onClose, searchMode, open } = props;
  const [selected, setSearchMode] = React.useState(searchMode);

  const handleClose = () => {
    onClose(selected);
  };

  const handleChecked = (value) => {
    const selectedOption = value.target.value
    setSearchMode(selectedOption)
  };

  return (
    <Dialog className={classes.root} onClose={handleClose} aria-labelledby="search-option-dialog-title" open={open}>
      <DialogTitle id="search-option-dialog-title" className={classes.title}>Search Options</DialogTitle>
      <FormControl component="fieldset" className={classes.formControl}>
        <RadioGroup aria-label="search-mode" name="search-mode" value={selected} onChange={handleChecked}>
          <FormControlLabel value={SEARCH_MODE.EXACT} control={<Radio />} label="Exact match (for genes)" />
          <FormControlLabel value={SEARCH_MODE.PREFIX} control={<Radio />} label="Prefix match (for genes)" />
          <FormControlLabel value={SEARCH_MODE.FUZZY} control={<Radio />} label="Fuzzy match (for systems)" />
        </RadioGroup>
      </FormControl>
      <div className={classes.buttons}>
        <Button variant="contained" color="primary" onClick={handleClose}>
          Apply
        </Button>
      </div>
    </Dialog>
  );
}

export default SearchOptionDialog