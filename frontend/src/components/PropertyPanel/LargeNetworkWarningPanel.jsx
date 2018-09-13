import React from 'react'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import WarningIcon from 'material-ui-icons/ErrorOutline'

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '3em',
  margin: 0,
  height: '100%',
  background: '#EEEEEE'
}

const iconStyle = {
  color: 'red',
  height: '4em',
  width: '4em',
  paddingBottom: '1em'
}

const buttonStyle = {
  color: 'red',
  height: '4em',
  width: '4em'
}

const LargeNetworkWarningPanel = props => {
  return (
    <div style={containerStyle}>
      <WarningIcon style={iconStyle} />

      <Typography
        variant="display4"
        style={{ color: 'red', fontSize: '2.5em' }}
      >
        This subsystem contains {props.summary.edgeCount} edges
      </Typography>

      <Typography
        variant="display1"
        style={{
          width: '80%',
          color: '#555555',
          fontSize: '1.3em',
          paddingTop: '2em',
          paddingBottom: '3em'
        }}
      >
        HiView needs to import the interaction network data from an external
        server (NDEx). This may take a long time for large networks like this
        one. (You can dig into child subsystems without loading data by
        double-clicking children)
      </Typography>

      <Button
        variant="raised"
        color="primary"
        onClick={() => handleImport(props)}
      >
        Load Anyway (May take a while)
      </Button>
    </div>
  )
}

const handleImport = props => {
  props.rawInteractionsActions.fetchInteractionsFromUrl(
    props.uuid,
    props.server,
    props.url,
    props.maxEdgeCount
  )
}

export default LargeNetworkWarningPanel
