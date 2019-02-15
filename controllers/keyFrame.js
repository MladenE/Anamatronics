const express        = require('express')
    , router         = express.Router()
    , validateParams = require('../services/parameters').KeyFrame
const uuidv1         = require('uuid/v1'); 
const keyFrame       = require('../models/keyFrame');
const servoMaster    = require('../models/servoMaster');


// Read
router.get('/', function(req, res) {
    // get all frames from db
})

// Create
router.post('/create', function(req, res) {
    
    const errorCb = error.init( req, res );        

    const validationErrors = validateParams
                                .init( "Params KeyFrame.Create" )
                                .KeyFrame.Create( req.user.note, req.user.duration )
                                .GetExceptions();
    
    if ( validationErrors[0].errors.length !== 0 ) { errorCb.send( validationErrors ) };

    // Get all servoMasters >> pass in cb of keyframe.create
    new promise( resolve( servoMasters.getAll(errorCb) ) )
    .then(
        (val) => { return resolve( keyFrame.create(val, errorCb) );}
    )
    .catch( errorCb );

    // Call the neo4j cypher and send it data
    

    // Return to the UI with an "Creating Keyframes" message
    res.send('Creating Keyframes');

    // On completion call a WebSocket?
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