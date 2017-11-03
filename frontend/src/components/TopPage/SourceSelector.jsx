import React, {Component} from 'react'

import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/Menu/MenuItem'
import Button from 'material-ui/Button'

import { withStyles } from 'material-ui/styles'

import {browserHistory} from 'react-router'
import style from './style.css'


const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 600,
    fontSize: '2em'
  },
});

const EXAMPLE_UUIDS = {
  'Large hierarchy': '7ae8907a-b395-11e7-b629-0660b7976219',
  'Small hierarchy': 'c6e1786f-b91b-11e7-82da-0660b7976219'
}


class SourceSelector extends Component {

  constructor(props) {
    super(props)
    this.state = {
      uuid: '',
      serverUrl: props.dataSource.get('serverUrl'),
      example: EXAMPLE_UUIDS['Small hierarchy']
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

  handleExampleChange = event => {
    console.log(event)


    this.setState({
      example: event.target.value,
      uuid: event.target.value,
    })
  }

  handleStart = () => {

    this.props.dataSourceActions.addDataSource(this.state)

    browserHistory.push('/app')
  }

  render() {
    const { classes } = this.props;

    const examples = Object.keys(EXAMPLE_UUIDS)

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


        <TextField
          id="examples"
          select
          label="Example Hierarchies:"
          className={classes.textField}
          value={this.state.example}
          onChange={this.handleExampleChange}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          margin="normal"
        >

          {examples.map(option => (
            <MenuItem
              key={option}
              value={EXAMPLE_UUIDS[option]}>
              {option}
            </MenuItem>
          ))}
        </TextField>

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
