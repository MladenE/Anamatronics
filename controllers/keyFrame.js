const express        = require('express')
    , router         = express.Router()
    , validateParams = require('../services/parameters').KeyFrame
const uuidv1         = require('uuid/v1'); 


// Read
router.get('/', function(req, res) {
    // get all frames from db
})

// Create
router.post('/create', function(req, res) {
    
    const errorCb = error.init( req, res );        

    const validationErrors = validateParams
                                .init( "Params KeyFrame.Create" )
                                .KeyFrame.Create( req.user.note )   // Add duration to this.
                                .GetExceptions();
    
    if ( validationErrors[0].errors.length !== 0 ) { errorCb.send( validationErrors ) };


    // Build object to send to neo4j  <-- This needs to go into a class of it's own to make this less concrete.

    // Get all servoMasters
    const servoMasters = [];

    // Create new data object and add id and note for new KeyFrame
    // See NOTES > "Example KeyFrame object for Neo4j"
    const data = {
          keyFrame : { id : uuidv1(), note : req.user.note }
        , servos : []
    };

    // Loop through servoMasters: calculate number of transitions needed
    for (var i; i <= servoMasters.length; i++) 
    {
        // Create the servo
        const servo = {
              id        : uuidv1()
            , masterId  : servoMasters[i].id
            , note      : ""
            , positions : {}
        }

        // Calc the number of transitions ( including Head position ) needed for this servo.
        const transitionCount = Math.ceil( req.user.duration / servoMasters[i].speed );

        // The starting position for each transition. Half way between pwm0 and pwm180
        const defaultPosition = ( servoMasters[i].pwm180Degrees + servoMasters[i].pwm0Degrees ) / 2; 

        // Create positions to hold the head and transitions. Add the head position.
        const positions = {
              head        : { id : uuidv1(), position : defaultPosition, note : '' }
            , transitions : []
        }

        // Add the transitions to postions
        for (const p; p <= transitionCount -1; p++)
        {
            const transition = {
                  id       : uuidv1()
                , position : defaultPosition
                , note     : ''
            }

            // Add transitions to position.transitions
            positions.transitions.push( transition );
        }

        servo.positions.push( positions );

        data.servos.push( servo );
    }

    // Call the neo4j cypher and send it data

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