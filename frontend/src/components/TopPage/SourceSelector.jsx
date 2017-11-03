import React, {Component} from 'react'

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button'

import { withStyles } from 'material-ui/styles';



import {browserHistory} from 'react-router'
import style from './style.css'
//
const DEFAULT_UUID = '7ae8907a-b395-11e7-b629-0660b7976219'
// const DEFAULT_UUID = 'c6e1786f-b91b-11e7-82da-0660b7976219'

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 600,
    fontSize: '2em'
  },
});


class SourceSelector extends Component {



  constructor(props) {
    super(props)
    this.state = {
      uuid: DEFAULT_UUID,
      serverUrl: props.dataSource.get('serverUrl'),
    }
  }

  handleUuidChange = event => {
    this.setState({
      uuid: event.target.value,
    })
  }

  handleUrlChange = event => {
    this.setState({
      url: event.target.value,
    })
  }

  handleStart = () => {

    console.log(this.state)
    this.props.dataSourceActions.addDataSource(this.state)

    browserHistory.push('/app')
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={style.row2}>
        <TextField
          className={classes.textField}
          placeholder='e.g. http://test.ndexbio.org'
          label='NDEx Server URL'
          margin="normal"
          value={this.state.serverUrl}
          onChange={this.handleUrlChange}
        />

        <TextField
          className={classes.textField}
          label="UUID of the main hierarchy"
          value={this.state.uuid}
          margin="normal"
          onChange={this.handleUuidChange}
        />

        <Button
          raised
          color="primary"
          onClick={this.handleStart}
        >
          Start
        </Button>

      </div>
    )
  }
}

export default withStyles(styles)(SourceSelector);
