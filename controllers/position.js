var express = require('express')
  , router = express.Router()
  , validateParams = require('../services/parameters').Position


// Read Positions
router.patch('update/position', function(req, res) {
    
    const errorCb = error.init( req, res );        

    const validationErrors = validateParams
                                .init( "Params Position.UpdatePosition" )
                                .Position.UpdatePosition( req.user.positionId, req.user.position )
                                .GetExceptions();
    
    if ( validationErrors[0].errors.length !== 0 ) { errorCb.send( validationErrors ) };

    res.send('All Frames');
})

router.patch('update/note', function(req, res) {
    
    const errorCb = error.init( req, res );        

    const validationErrors = validateParams
                                .init( "Params Position.UpdateNote" )
                                .Position.UpdateNote( req.user.positionId, req.user.note )
                                .GetExceptions();
    
    if ( validationErrors[0].errors.length !== 0 ) { errorCb.send( validationErrors ) };

    res.send('Frame ' + req.params.id);
})

// Update
router.post('/transition/all:positionId', function(req, res) {
    
    const errorCb = error.init( req, res );        

    const validationErrors = validateParams
                                .init( "Params Position.TransitionGetAllForPositionId" )
                                .Position.TransitionGetAllForPositionId( req.params.positionId )
                                .GetExceptions();
    
    if ( validationErrors[0].errors.length !== 0 ) { errorCb.send( validationErrors ) };

})


module.exports = router