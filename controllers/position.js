var express = require('express')
  , router = express.Router()
  , validateParams = require('../services/parameters').Position


// Read Positions
router.patch('update/position', function(req, res) {
    validateParams.UpdatePosition(req.user.positionId, req.user.position);
    res.send('All Frames');
})

router.patch('update/note', function(req, res) {
    validateParams.UpdateNote(req.user.positionId, req.user.note);
    res.send('Frame ' + req.params.id);
})

// Update
router.post('/transition/all:positionId', auth, function(req, res) {
    validateParams.TransitionGetAllForPositionId(req.params.positionId);

})


module.exports = router