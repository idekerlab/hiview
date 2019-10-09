import React from 'react'
import { Button, Divider, FormControl, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  root: {
    padding: '0.5em',
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  loginButton: {
    marginTop: '0.7em'
  },
  bottom: {
    marginTop: '2em'
  },
  formControl: {
    flexGrow: 2
  }
})

const NdexCredentialsLoginPanel = props => {
  const { error, handleCredentialsSignOn } = props
  const classes = useStyles()

  return (
    <form
      className={classes.root}
      name="basicAuthSignIn"
      onSubmit={handleCredentialsSignOn}
    >
      <FormControl className={classes.formControl}>
        <TextField
          name="accountName"
          type="text"
          placeholder="Your NDEx ID"
          required
          title=""
          autoComplete="username"
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField
          name="password"
          type="password"
          placeholder="Password"
          required
          title=""
          autoComplete="password"
        />
      </FormControl>

      <Button
        className={classes.loginButton}
        variant="contained"
        disabled={error}
        color={'secondary'}
        type="submit"
      >
        Sign In
      </Button>

      <div className={classes.bottom}>
        <Divider />

        <Typography variant={'body1'}>
          Need an account?{' '}
          <a href="http://ndexbio.org">Click here to sign up!</a>
        </Typography>

        {error && (
          <div className="text-danger">
            <strong>
              <span>{error}</span>
            </strong>
          </div>
        )}
      </div>
    </form>
  )
}

export default NdexCredentialsLoginPanel
