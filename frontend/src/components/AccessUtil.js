const getHeader = credentials => {
  if (credentials === null || credentials === undefined) {
    return {}
  }

  const userInfo = credentials.loginDetails
  if (userInfo === null || userInfo === undefined) {
    return {}
  }

  if (credentials.isGoogle) {
    return getGoogleHeader(userInfo)
  } else {
    return getBasicHeader(userInfo)
  }
}

const getGoogleHeader = userInfo => {
  const token = userInfo.tokenObj.token_type + ' ' + userInfo.tokenObj.id_token

  console.log('G Outh = ', token)
  return {
    authorization: token
  }
}

const getBasicHeader = userInfo => {
  const auth = 'Basic ' + btoa(userInfo.id + ':' + userInfo.password)
  return {
    authorization: auth
  }
}

export { getHeader }
