import React, {Component} from 'react'

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button'


import {browserHistory} from 'react-router'
import style from './style.css'

class OntologySelector extends Component {

  constructor(props) {
    super(props)
    this.state = {
      // uuid: '20bcb48f-3e6b-11e7-baf1-0660b7976219',
      // uuid: 'c848905a-8edb-11e7-9743-0660b7976219',
      uuid: 'fbc9753b-98d1-11e7-9743-0660b7976219',
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

          <Button
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
