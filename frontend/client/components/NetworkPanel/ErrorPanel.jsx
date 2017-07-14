import React from 'react'

import ErrorIcon from 'material-ui/svg-icons/alert/error-outline'
import BackIcon from 'material-ui/svg-icons/navigation/arrow-back'
import FlatButton from 'material-ui/FlatButton'

const BASE_STYLE = {
  width: '40%',
  height: '40%'
};


const ErrorPanel = ({style, handleBack}) => (

  <div className={style.container}>

    <h1>A Problem Occurred While Downloading Data</h1>
    <h2>Possible Causes:</h2>
    <h3>Invalid URL</h3>
    <h3>Invalid NDEx ID</h3>
    <h3>Remote server is down</h3>

    <ErrorIcon
      color={'#ff0033'}
      style={BASE_STYLE}
    />

    <FlatButton
      label="Back to Data Source Selector"
      labelPosition='after'
      labelStyle={{ fontWeight: 700 }}
      icon={<BackIcon />}
      onClick={handleBack}
    />
  </div>
)

export default ErrorPanel
