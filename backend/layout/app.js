const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// Endpoints
const {getLayouts} = require('./api/layout')


app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())


const port = process.env.PORT || 8888
const router = express.Router()

const STATUS_MESSAGE = {
  name: 'CyLayouts',
  apiVersion: 'v1',
  algorithms: ['d3-cluster', 'd3-tree']
}

router.get('/', (req, res) => {
   res.status(200).json(STATUS_MESSAGE)
})


router.route('/layouts').get(getLayouts)


app.use('/v1', router)


app.listen(port, () => {
  console.log('Layout service listening on port ' + port)
})
