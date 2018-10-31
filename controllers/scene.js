var express = require('express')
  , router = express.Router()
  , validateParams = require('../services/parameters')
  //, Comment = require('../models/comment')
  //, auth = require('../middlewares/auth')

router.get('/', function(req, res) {
    res.send('All Sequences');
})

router.get('/:id', function(req, res) {
    const errorCb = error.init( req, res );        

    const validationErrors = validateParams
                                .init( "Params Scene.GetForId" )
                                .Scene.GetForId( req.params.id )
                                .GetExceptions();
    
    if ( validationErrors[0].errors.length !== 0 ) { errorCb.send( validationErrors ) };

    res.send(req.params.id);
    //res.send('Sequence ' + req.params.id);
})

router.post('/create/', function(req, res) {
    const errorCb = error.init( req, res );        

    const validationErrors = validateParams
                                .init( "Params Scene.Create" )
                                .Scene.Create( req.user.newName, req.user.actionIds )
                                .GetExceptions();
    
    if ( validationErrors[0].errors.length !== 0 ) { errorCb.send( validationErrors ) };

    //newName = req.user.newName
})

router.delete('/delete/:id', function(req, res) {
    const errorCb = error.init( req, res );        

    const validationErrors = validateParams
                                .init( "Params Scene.Delete" )
                                .Scene.Delete( req.params.id )
                                .GetExceptions();
    
    if ( validationErrors[0].errors.length !== 0 ) { errorCb.send( validationErrors ) };

})

router.get('/play/:id', function(req, res) {
    const errorCb = error.init( req, res );        

    const validationErrors = validateParams
                                .init( "Params Scene.Play" )
                                .Scene.Play( req.params.id )
                                .GetExceptions();
    
    if ( validationErrors[0].errors.length !== 0 ) { errorCb.send( validationErrors ) };
    //res.send('Play Sequence ' + req.params.id);
})

router.post('/update/name', function(req, res) {
    const errorCb = error.init( req, res );        

    const validationErrors = validateParams
                                .init( "Params Scene.UpdateName" )
                                .Scene.UpdateName( req.user.id, req.user.newName )
                                .GetExceptions();
    
    if ( validationErrors[0].errors.length !== 0 ) { errorCb.send( validationErrors ) };

})

router.post('/update/audioFile', function(req, res) {
    const errorCb = error.init( req, res );        

    const validationErrors = validateParams
                                .init( "Params Scene.UpdateAudioFile" )
                                .Scene.UpdateAudioFile( req.user.id, req.user.audioPath )
                                .GetExceptions();
    
    if ( validationErrors[0].errors.length !== 0 ) { errorCb.send( validationErrors ) };
})

router.post('/action/add', function(req, res) {
    const errorCb = error.init( req, res );        

    const validationErrors = validateParams
                                .init( "Params Scene.ActionAdd" )
                                .Scene.ActionAdd( req.user.sceneId, req.user.actionId )
                                .GetExceptions();
    
    if ( validationErrors[0].errors.length !== 0 ) { errorCb.send( validationErrors ) };
})

router.get('/action/all/:sceneId', function(req, res) {
    const errorCb = error.init( req, res );        

    const validationErrors = validateParams
                                .init( "Params Scene.ActionGetAll" )
                                .Scene.ActionGetAll( req.params.sceneId )
                                .GetExceptions();
    
    if ( validationErrors[0].errors.length !== 0 ) { errorCb.send( validationErrors ) };
})

router.post('/action/delete', function(req, res) {
    const errorCb = error.init( req, res );        

    const validationErrors = validateParams
                                .init( "Params Scene.ActionDelete" )
                                .Scene.ActionDelete( req.user.sceneId, req.user.actionId )
                                .GetExceptions();
    
    if ( validationErrors[0].errors.length !== 0 ) { errorCb.send( validationErrors ) };
})

router.post('/action/update/positions', function(req, res) {
    const errorCb = error.init( req, res );        

    const validationErrors = validateParams
                                .init( "Params Scene.ActionUpdateOrder" )
                                .Scene.ActionUpdateOrder( req.user.sceneId, req.user.positions )
                                .GetExceptions();
    
    if ( validationErrors[0].errors.length !== 0 ) { errorCb.send( validationErrors ) };
})

module.exports = router