var express = require('express')
  , router = express.Router()
  , validateParams = require('../services/parameters').Scene
  //, Comment = require('../models/comment')
  //, auth = require('../middlewares/auth')

router.get('/', function(req, res) {
    res.send('All Sequences');
})

router.get('/:id', function(req, res) {
    validateParams.GetForId(req.params.id);
    //res.send('Sequence ' + req.params.id);
})

router.post('/create/', auth, function(req, res) {
    validateParams.Create(req.user.newName, req.user.actionIds);
    //newName = req.user.newName
})

router.delete('/delete/:id', function(req, res) {
    validateParams.Delete(req.params.id);
})

router.get('/play/:id', function(req, res) {
    validateParams.Play(req.params.id);
    //res.send('Play Sequence ' + req.params.id);
})

router.post('/update/name', function(req, res) {
    validateParams.UpdateName(req.user.id, req.user.newName);
})

router.post('/update/audioFile', auth, function(req, res) {
    validateParams.UpdateAudioFile(req.user.id, req.user.audioPath);
})

router.post('/action/add', auth, function(req, res) {
    validateParams.ActionAdd(req.user.sceneId, req.user.actionId);
})

router.get('/action/all/:sceneId', auth, function(req, res) {
    validateParams.ActionGetAll(req.params.sceneId);
})

router.post('/action/delete', auth, function(req, res) {
    validateParams.ActionDelete(req.user.sceneId, req.user.actionId);
})

router.post('/action/update/positions', auth, function(req, res) {
    validateParams.ActionUpdateOrder(req.user.sceneId, req.user.positions);
})

module.exports = router