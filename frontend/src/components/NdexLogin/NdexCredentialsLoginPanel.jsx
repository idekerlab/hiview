import React, { useState } from 'react'
import { Button, Divider, FormControl, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'

import { ErrorOutline } from '@material-ui/icons'
import { validateLogin } from './validateCredentials'
import LoadingPanel from './LoadingPanel'

const useStyles = makeStyles({
  root: {
    padding: '0.8em',
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  loginButton: {
    marginTop: '0.7em'
  },
  bottom: {
    // marginTop: '2em'
  },
  formControl: {
    flexGrow: 2
  },
  error: {
    paddingLeft: '0.5em'
  },
  errorPanel: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '0.5em',
    height: '3em'
  },
  blank: {
    marginTop: '0.5em',
    width: '100%',
    height: '3em'
  }
})

const FIELD_NAME = {
  ID: 'id',
  PW: 'password'
}

const NdexCredentialsLoginPanel = props => {
  const { handleCredentialsSignOn, ndexServer } = props
  const classes = useStyles()

  const [isLoading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const handleSubmit = event => {
    console.log('Submit:', id, password)
    setLoading(true)
    setErrorMessage(null)

    validateLogin(id, password, ndexServer).then(data => {
      console.log('returned Validation:', data)

      setTimeout(() => {
        setLoading(false)

        if (data.error !== null) {
          setErrorMessage(data.error.message)
        } else {
          handleCredentialsSignOn({
            id,
            password,
            ndexServer,
            fullName: data.userData.firstName + ' ' + data.userData.lastName,
            image: data.userData.image,
            details: data.userData
          })
        }
      }, 500)
    })
  }

  const handleChange = tag => event => {
    const value = event.target.value
    if (tag === FIELD_NAME.ID) {
      setId(value)
    } else if (tag === FIELD_NAME.PW) {
      setPassword(value)
    }

    if (id !== '' && password !== '') {
      setDisabled(false)
    }
  }

  if (isLoading) {
    return <LoadingPanel message={'Validating your user info...'} />
  }

  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
        <TextField
          name="id"
          type="text"
          placeholder="Your NDEx ID"
          required
          title=""
          autoComplete="username"
          onChange={handleChange('id')}
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
          onChange={handleChange('password')}
        />
      </FormControl>

      <Button
        className={classes.loginButton}
        variant="contained"
        color={'secondary'}
        onClick={handleSubmit}
        disabled={disabled}
      >
        Sign In
      </Button>

      {errorMessage ? (
        <div className={classes.errorPanel}>
          <ErrorOutline color={'error'} />
          <Typography
            className={classes.error}
            variant={'body1'}
            color={'error'}
          >
            {errorMessage}
          </Typography>
        </div>
      ) : (
        <div className={classes.blank} />
      )}

      <div className={classes.bottom}>
        <Divider />

        <Typography variant={'body1'}>
          Need an account?{' '}
          <a href="https://ndexbio.org">Click here to sign up!</a>
        </Typography>
      </div>
    </div>
  )
}

export default NdexCredentialsLoginPanel
