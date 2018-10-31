var express = require('express')
  , router = express.Router()
  , validateParams = require('../services/parameters')


// Read Positions
router.patch('update/position', function(req, res) {
    
    const errorCb = error.init( req, res );        

    const validationErrors = validateParams
                                .init( "Params Transition.UpdatePosition" )
                                .Transition.UpdatePosition( req.user.transitionId, req.user.position )
                                .GetExceptions();
    
    if ( validationErrors[0].errors.length !== 0 ) { errorCb.send( validationErrors ) };
    
    res.send('All Frames');
})

router.patch('update/note', function(req, res) {
    
    const errorCb = error.init( req, res );        

    const validationErrors = validateParams
                                .init( "Params Transition.UpdateNote" )
                                .Transition.UpdateNote( req.user.transitionId, req.user.note )
                                .GetExceptions();
    
    if ( validationErrors[0].errors.length !== 0 ) { errorCb.send( validationErrors ) };

    res.send('Frame ' + req.params.id);
})



module.exports = router