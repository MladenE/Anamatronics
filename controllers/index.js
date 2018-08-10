var express = require('express')
  , router = express.Router()
  //, Comment = require('../models/comment')

router.use('/frame',    require('./frame'))
router.use('/position', require('./position'))
router.use('/sequence', require('./sequence'))
router.use('/setup',    require('./setup'))

router.get('/', function(req, res) {
  // Home
})

module.exports = router