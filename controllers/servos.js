var express = require('express')
  , router = express.Router()
  , validateParams = require('../services/parameters')


// Read
router.get('/:servoId', function(req, res) {
    
    const errorCb = error.init( req, res );        

    const validationErrors = validateParams
                                .init( "Params Servo.GetForId" )
                                .Servo.GetForId( req.params.servoId )
                                .GetExceptions();
    
    if ( validationErrors[0].errors.length !== 0 ) { errorCb.send( validationErrors ) };
    // get all frames from db
})

// Update
router.patch('/update/note', function(req, res) {
    
    const errorCb = error.init( req, res );        

    const validationErrors = validateParams
                                .init( "Params Servo.UpdateNote" )
                                .Servo.UpdateNote( req.user.servoId, req.user.note )
                                .GetExceptions();
    
    if ( validationErrors[0].errors.length !== 0 ) { errorCb.send( validationErrors ) };
    
    res.send('Get Frame ' + req.params.id + ' for editing');
})

router.get('/position/all:servoId', function(req, res) {
    
    const errorCb = error.init( req, res );        

    const validationErrors = validateParams
                                .init( "Params Servo.PositionGetAllForServoId" )
                                .Servo.PositionGetAllForServoId( req.params.servoId )
                                .GetExceptions();
    
    if ( validationErrors[0].errors.length !== 0 ) { errorCb.send( validationErrors ) };
    
})


module.exports = router