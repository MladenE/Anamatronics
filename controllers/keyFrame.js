var express = require('express')
  , router = express.Router()
  , validateParams = require('../services/parameters').KeyFrame


// Read
router.get('/', function(req, res) {
    // get all frames from db
})

// Create
router.post('/create', auth, function(req, res) {
    validateParams.Create(req.user.note);
    //newName = req.user.newName
})

// Update
router.patch('/update/note', function(req, res) {
    validateParams.UpdateNote(req.user.id, req.user.note);
    res.send('Get Frame ' + req.params.id + ' for editing');
})

router.get('/servo/all:keyFrameId', auth, function(req, res) {
    validateParams.ServoGetAllForKeyFrameId(req.params.keFrameId);
})



module.exports = router