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

    // Get all servoMasters
    servoMasters.getAll( keyFrame.create );
    const servoMasters = [];

    // Build an object to send to neo4j 
    const data = keyFrame.create( servoMasters );

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