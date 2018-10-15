var express = require('express')
  , router = express.Router()
  , validateParams = require('../services/parameters').Transition


// Read Positions
router.patch('update/position', function(req, res) {
    validateParams.UpdatePosition(req.user.transitionId, req.user.position);
    res.send('All Frames');
})

router.patch('update/note', function(req, res) {
    validateParams.UpdateNote(req.user.transitionId, req.user.note);
    res.send('Frame ' + req.params.id);
})



module.exports = router