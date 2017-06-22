const express = require('express')
const bodyParser = require('body-parser')

const app = express()

// Endpoints
const {filter} = require('./api/cxFilter')
const {getLayouts} = require('./api/layout')
const {applyClusterLayout} = require('./api/d3-cluster-layout')

app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(bodyParser.json({
  limit: '1tb' // Max size of the data
}))


const port = process.env.PORT || 3100
const router = express.Router()

const STATUS_MESSAGE = {
  name: 'Graph Layout Service',
  apiVersion: 'v1',
  algorithms: ['d3-cluster']
}

router.get('/', (req, res) => {
   res.status(200).json(STATUS_MESSAGE)
})


router.route('/filter/:type').post(filter)

router.route('/layouts').get(getLayouts)

router.route('/layouts/cluster').post(applyClusterLayout)
router.route('/layouts/cluster/:style').post(applyClusterLayout)


app.use('/v1', router)

app.listen(port, () => {
  console.log('Layout service listening on port ' + port)
})
