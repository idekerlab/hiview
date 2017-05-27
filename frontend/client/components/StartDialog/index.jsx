import React, {Component} from 'react'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'

export default class StartDialog extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: true,
      notReady: true
    }
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Back to Home"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Load Hierarchy"
        primary={true}
        disabled={this.state.notReady}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <Dialog
        title="Welcome to HiView!"
        actions={actions}
        modal={true}
        open={this.state.open}
      >
        <h3>Please enter location of your hierarchy</h3>

        <TextField
          hintText='e.g. http://test.ndexbio.org'
          floatingLabelText='NDEx Server URL'
          value={this.state.serverUrl}
          onChange={this.handleUrlChange}
        />

        <TextField
          floatingLabelText="UUID of the main hierarchy"
          value={this.state.uuid}
          onChange={this.handleUuidChange}
        />
      </Dialog>
    );
  }
}