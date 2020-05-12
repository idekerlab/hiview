// For local cache
import Dexie from 'dexie'

const DB_NAME = 'HiView'
const DB_VERSION = 2
const DB_STORE = 'hierarchy'
const DB_PRIMARY_KEY = 'uuid'

const DB_RAW_INTERACTIONS = 'interactions'

let initialized = false

const hvDb = new Dexie(DB_NAME)

const initDB = () => {
  hvDb.version(DB_VERSION).stores({
    [DB_STORE]: DB_PRIMARY_KEY,
    [DB_RAW_INTERACTIONS]: DB_PRIMARY_KEY
  })

  hvDb.open().catch(e => {
    console.error(DB_NAME + ': Open failed: ' + e)
  })
}

class LocalDB {
  static getDB = () => {
    if (!initialized) {
      initDB()
      initialized = true
    }
    return hvDb
  }
}

export default LocalDB
