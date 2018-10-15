var express = require('express')
  , router = express.Router()
  , bodyParser = require('body-parser')
  , validateParams = require('../services/parameters').Action
  //, Comment = require('../models/comment')
  //, auth = require('../middlewares/auth')

// get all actions ( used in the modal when adding to scene )
router.get('/', function(req, res) {
    // get all frames from db
    res.send('All Actions');
})

// GetAction
router.get('/:id', function(req, res) {
    validateParams.GetForId(req.params.id);
    // get all frames from db
    res.send('Single action');
})

// CreateAction
router.post('/create/', auth, function(req, res) {
    validateParams.Create(req.user.name);
    //newName = req.user.newName
})

// DeleteAction
router.delete('/delete/:id', auth, function(req, res) {
    validateParams.Delete(req.params.id);
    // replace auth middleware with something to get the action
    //newName = req.user.newName
})

//UpdateName
router.patch('/update/name', auth, function(req, res) {
    validateParams.UpdateName(req.params.id, req.params.name);
    // replace auth middleware with something to get the action
    //newName = req.user.newName
})

//UpdateName
router.patch('/update/note', auth, function(req, res) {
    validateParams.UpdateNote(req.params.id, req.params.note);
    // replace auth middleware with something to get the action
    //newName = req.user.newName
})

//UpdateName
router.patch('/update/audiofile', auth, function(req, res) {
    validateParams.UpdateAudioFile(req.params.id, req.params.filePath);
    // replace auth middleware with something to get the action
    //newName = req.user.newName
})

// GetAllActionsForScene
router.get('/keyFrame/all:actionId', function(req, res) {
    validateParams.KeyFrameGetAllForActionId(req.params.actionId);
    // get all frames from db
})

// GetAllActionsForScene
router.delete('/keyFrame/delete:actionId:keyframeId', function(req, res) {
    validateParams.KeyFrameDelete(req.params.actionId, req.params.keyframeId);
    // get all frames from db
})

// GetAllActionsForScene
router.post('/keyFrame/update/positions', function(req, res) {
    validateParams.KeyFrameUpdateOrder(req.user.actionId, req.user.actionPositions);
    // get all frames from db
})

module.exports = router