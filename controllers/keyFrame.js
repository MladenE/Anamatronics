var express = require('express')
  , router = express.Router()
  , validateParams = require('../services/parameters').KeyFrame


// Read
router.get('/', function(req, res) {
    // get all frames from db
})

// Create
router.post('/create', function(req, res) {
    
    const errorCb = error.init( req, res );        

    const validationErrors = validateParams
                                .init( "Params KeyFrame.Create" )
                                .KeyFrame.Create( req.user.note )
                                .GetExceptions();
    
    if ( validationErrors[0].errors.length !== 0 ) { errorCb.send( validationErrors ) };
    //newName = req.user.newName
})

// Update
router.patch('/update/note', function(req, res) {
    
    const errorCb = error.init( req, res );        

    const validationErrors = validateParams
                                .init( "Params KeyFrame.UpdateNote" )
                                .KeyFrame.UpdateNote( req.user.id, req.user.note )
                                .GetExceptions();
    
    if ( validationErrors[0].errors.length !== 0 ) { errorCb.send( validationErrors ) };
    
    res.send('Get Frame ' + req.params.id + ' for editing');
})

router.get('/servo/all:keyFrameId', function(req, res) {
    
    const errorCb = error.init( req, res );        

    const validationErrors = validateParams
                                .init( "Params KeyFrame.ServoGetAllForKeyFrameId" )
                                .KeyFrame.ServoGetAllForKeyFrameId( req.params.keFrameId )
                                .GetExceptions();
    
    if ( validationErrors[0].errors.length !== 0 ) { errorCb.send( validationErrors ) };
    
})



module.exports = router