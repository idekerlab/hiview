async function validateLogin(id, password, ndexServer) {
  const auth = 'Basic ' + btoa(id + ':' + password)
  const headers = {
    authorization: auth
  }
  const url = ndexServer + '/v2/user?valid=true'

  const res = await fetch(url, {
    method: 'GET',
    headers: headers
  })
  const status = res.status
  let userData = await res.json()

  let error = null
  if (status !== 200) {
    error = userData
    userData = null
  }
  return {
    status,
    userData,
    error
  }
}

export { validateLogin }
