var express = require('express')
  , router = express.Router()
  , validateParams = require('../services/parameters')
  //, Comment = require('../models/comment')
  //, auth = require('../middlewares/auth')

// get all actions ( used in the modal when adding to scene )
router.get('/', function(req, res) {
    // get all frames from db
    res.send('All Actions');
})

// GetAction
router.get('/:id', function(req, res) {
    
    const errorCb = error.init( req, res );        

    const validationErrors = validateParams
                                .init( "Params Action.GetForId" )
                                .Action.GetForId( req.params.id )
                                .GetExceptions();
    
    if ( validationErrors[0].errors.length !== 0 ) { errorCb.send( validationErrors ) };
    
    // get all frames from db
    res.send('Single action');
})

// CreateAction
router.post('/create/', function(req, res) {
    
    const errorCb = error.init( req, res );        

    const validationErrors = validateParams
                                .init( "Params Action.Create" )
                                .Action.Create( req.user.name )
                                .GetExceptions();
    
    if ( validationErrors[0].errors.length !== 0 ) { errorCb.send( validationErrors ) };
    
    //newName = req.user.newName
})

// DeleteAction
router.delete('/delete/:id', function(req, res) {
    
    const errorCb = error.init( req, res );        

    const validationErrors = validateParams
                                .init( "Params Action.Delete" )
                                .Action.Delete( req.params.id )
                                .GetExceptions();
    
    if ( validationErrors[0].errors.length !== 0 ) { errorCb.send( validationErrors ) };

    // replace auth middleware with something to get the action
    //newName = req.user.newName
})

//UpdateName
router.patch('/update/name', function(req, res) {
    
    const errorCb = error.init( req, res );        

    const validationErrors = validateParams
                                .init( "Params Action.UpdateName" )
                                .Action.UpdateName( req.params.id, req.params.name )
                                .GetExceptions();
    
    if ( validationErrors[0].errors.length !== 0 ) { errorCb.send( validationErrors ) };

    // replace auth middleware with something to get the action
    //newName = req.user.newName
})

//UpdateName
router.patch('/update/note', function(req, res) {
    
    const errorCb = error.init( req, res );        

    const validationErrors = validateParams
                                .init( "Params Action.UpdateNote" )
                                .Action.UpdateNote( req.params.id, req.params.note )
                                .GetExceptions();
    
    if ( validationErrors[0].errors.length !== 0 ) { errorCb.send( validationErrors ) };
    
    // replace auth middleware with something to get the action
    //newName = req.user.newName
})

//UpdateName
router.patch('/update/audiofile', function(req, res) {
    
    const errorCb = error.init( req, res );        

    const validationErrors = validateParams
                                .init( "Params Action.UpdateAudioFile" )
                                .Action.UpdateAudioFile( req.params.id, req.params.filePath )
                                .GetExceptions();
    
    if ( validationErrors[0].errors.length !== 0 ) { errorCb.send( validationErrors ) };
    
    // replace auth middleware with something to get the action
    //newName = req.user.newName
})

// GetAllActionsForScene
router.get('/keyFrame/all:actionId', function(req, res) {
    
    const errorCb = error.init( req, res );        

    const validationErrors = validateParams
                                .init( "Params Action.KeyFrameGetAllForActionId" )
                                .Action.KeyFrameGetAllForActionId( req.params.actionId )
                                .GetExceptions();
    
    if ( validationErrors[0].errors.length !== 0 ) { errorCb.send( validationErrors ) };
    // get all frames from db
})

// GetAllActionsForScene
router.delete('/keyFrame/delete:actionId:keyframeId', function(req, res) {
    
    const errorCb = error.init( req, res );        

    const validationErrors = validateParams
                                .init( "Params Action.KeyFrameDelete" )
                                .Action.KeyFrameDelete( req.params.actionId, req.params.keyframeId )
                                .GetExceptions();
    
    if ( validationErrors[0].errors.length !== 0 ) { errorCb.send( validationErrors ) };
    // get all frames from db
})

// GetAllActionsForScene
router.post('/keyFrame/update/positions', function(req, res) {
    
    const errorCb = error.init( req, res );        

    const validationErrors = validateParams
                                .init( "Params Action.KeyFrameUpdateOrder" )
                                .Action.KeyFrameUpdateOrder( req.user.actionId, req.user.actionPositions )
                                .GetExceptions();
    
    if ( validationErrors[0].errors.length !== 0 ) { errorCb.send( validationErrors ) };

    // get all frames from db
})

module.exports = router