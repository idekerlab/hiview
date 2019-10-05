import React from 'react'
import { Button, FormControl, TextField } from '@material-ui/core'

const NdexCredentialsSignOnPanel = props => {
  const { error, handleCredentialsSignOn } = props

  const button_cls = error ? 'btn btn-primary disabled' : 'btn btn-primary'

  return (
    <form name="basicAuthSignIn" onSubmit={handleCredentialsSignOn}>
      <FormControl className="form-control">
        <TextField
          name="accountName"
          type="text"
          placeholder="Account Name"
          required
          title=""
          autoComplete="username"
        />
      </FormControl>
      <FormControl className="form-control">
        <TextField
          name="password"
          type="password"
          placeholder="Password"
          required
          title=""
          autoComplete="password"
        />
      </FormControl>

      <div className="ndex-account-links">
        <div>
          <span>Need an account? </span>
          <a href="http://ndexbio.org">Click here to sign up!</a>
        </div>
      </div>

      {error && (
        <div className="text-danger">
          <br />
          <strong>
            <span
            >
              {error}
            </span>
          </strong>
        </div>
      )}

      <div className="credentials-button-container">
        {this.props.handleClose && (
          <Button
            className="btn btn-default"
            variant="contained"
            onClick={this.props.handleClose}
            type="button"
          >
            Cancel
          </Button>
        )}

        <Button
          className={button_cls}
          variant="contained"
          color="primary"
          type="submit"
        >
          Sign In
        </Button>
      </div>
    </form>
  )
}

export default NdexCredentialsSignOnPanel
