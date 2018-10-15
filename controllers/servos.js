var express = require('express')
  , router = express.Router()
  , validateParams = require('../services/parameters').Servo


// Read
router.get('/:servoId', function(req, res) {
    validateParams.GetForId(req.params.servoId);
    // get all frames from db
})

// Update
router.patch('/update/note', function(req, res) {
    validateParams.UpdateNote(req.user.servoId, req.user.note);
    res.send('Get Frame ' + req.params.id + ' for editing');
})

router.get('/position/all:servoId', auth, function(req, res) {
    validateParams.PositionGetAllForServoId(req.params.servoId);
})


module.exports = router