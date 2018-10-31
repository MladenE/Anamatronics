var express = require('express')
  , router = express.Router()
  //, Comment = require('../models/comment')

router.use('/scene',      require('./scene'))     // All methods in scene.js will be prepended by /scene in the API url
router.use('/action',     require('./action'))
router.use('/keyFrame',   require('./keyFrame'))
router.use('/servo',      require('./servos'))       // Servo data associated with keyframe
router.use('/position',   require('./position'))
router.use('/transition', require('./transitions'))
router.use('/setup',      require('./setup'))

router.get('/', function(req, res) {
  // Home
})

module.exports = router