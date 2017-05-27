import React, {Component} from 'react'

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import * as Colors from 'material-ui/styles/colors'

import {browserHistory} from 'react-router'
import style from './style.css'

class OntologySelector extends Component {

  constructor(props) {
    super(props)
    this.state = {
      uuid: '',
      serverUrl: props.dataSource.get('serverUrl')
    }
  }

  handleUuidChange = event => {
    this.setState({
      uuid: event.target.value
    })
  }

  handleUrlChange = event => {
    this.setState({
      url: event.target.value
    })
  }

  handleStart = () => {

    console.log(this.state)
    this.props.dataSourceActions.addDataSource(this.state)

    browserHistory.push('/app')
  }

  render() {

    console.log("--------Front prop ----------")
    console.log(this.props)

    return (
      <div className={style.dataSource}>
        <TextField
          className={style.source}
          hintText='e.g. http://test.ndexbio.org'
          floatingLabelText='NDEx Server URL'
          value={this.state.serverUrl}
          onChange={this.handleUrlChange}
        />

        <TextField
          className={style.source}
          floatingLabelText="UUID of the main hierarchy"
          value={this.state.uuid}
          onChange={this.handleUuidChange}
        />

        <section className={style.start}>

          <FlatButton
            className={style.startButton}
            label="Start"
            onClick={this.handleStart}
          />
        </section>
      </div>
    )
  }
}

export default OntologySelector
