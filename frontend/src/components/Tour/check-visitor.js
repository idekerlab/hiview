const KEY = '__visited'
const DAYS = 180
const EXPIRATION = 60 * 60 * 24 * DAYS

const getCookie = id => {
  const cookieMap = getCookieMap()
  return cookieMap.get(id)
}

const getCookieMap = () => {
  const cookies = document.cookie
  if (cookies === null || cookies === '' || cookies === undefined) {
    return new Map()
  }

  return new Map(
    cookies.split(/;\s*/).map(kv => {
      const entry = kv.match(/([^=]+)=(.*)/)
      const key = entry[1]
      const value = entry[2]
      return [key, value.replace(/(^"|"$)/g, '')]
    }),
  )
}

const checkFirstTimeVisitor = () => {
  const visited = getCookie(KEY)
  if (visited === null || visited === undefined) {
    document.cookie = `${KEY}=true;max-age=${EXPIRATION}`
    return true
  }

  return false
}

export { checkFirstTimeVisitor }
