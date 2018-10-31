const   express      = require('express')
      , router       = express.Router();
const db             = require('../services/neo4j');
const validateParams = require('../services/parameters');
const error          = require('../services/error');
const uuidv1         = require('uuid/v1'); 


// Read/Get all servos
router.get('/', function(req, res) {

    const errorCb = error.init( req, res );

    db.RunCypher(
          db.Cyphers.Servos.ReadAll.cypher
        , {}
        , errorCb     
        , ( result ) => { res.send( result ); } // What to do on success              
    );

})

// Read/Get specific servo
router.get('/:id', function(req, res) {

    const errorCb = error.init( req, res );        

    const validationErrors = validateParams
                                .init( "Params ServoMaster.GetForId" )
                                .ServoMaster.GetForId( req.params.id )
                                .GetExceptions();
    
    if ( validationErrors[0].errors.length !== 0 ) { errorCb.send( validationErrors ) };

    const validParams = { servoId : req.params.id };

    db.RunCypher(
          db.Cyphers.Servos.ReadSingle.cypher
        , validParams
        , errorCb     
        , ( result ) => { res.send( result ); } // What to do on success              
    );

})

// Create new Servo
router.post('/create/', function(req, res) {
    //newName = req.user.newName
    /*
        - check values
          - return validation errors to the client
        - create a POCO to send to the DB
        - update the db
          - send callback to return response to the client
    */
    const errorCb = error.init( req, res );

    const validationErrors = validateParams
                                .init("Params ServoMaster.Create")
                                .Create(
                                      req.params.name
                                    , req.params.location        
                                    , req.params.speed           
                                    , req.params.pwm0Degrees
                                    , req.params.pwm180Degrees )
                                .GetExceptions();
                                
    if ( validationErrors[0].errors.length !== 0 ) { errorCb.send( validationErrors ) };

    const validParams = {
                          id             : uuidv1()                   // Create ID in the code because Neo4j's auto id function is a faff.
                        , name           : req.params.name
                        , location       : req.params.location        // GPIO pin number
                        , speed          : req.params.speed           // float i.e 0.12
                        , pwm0Degrees    : req.params.pwm0Degrees
                        , pwm180Degrees  : req.params.pwm180Degrees
                        };

    db.RunCypher(
          db.Cyphers.Servos.Create.cypher
        , validParams
        , errorCb     
        , ( result ) => { res.send( result ); } // What to do on success              
    );
            
})

router.delete('/delete/:id', function(req, res) {

    const errorCb = error.init( req, res );

    const validationErrors = validateParams
                                .init( "Params ServoMaster.Delete" )
                                .ServoMaster.Delete( req.params.id )
                                .GetExceptions();

    if ( validationErrors[0].errors.length !== 0 ) { errorCb.send( validationErrors ) };

    const validParams = { servoId : req.params.id };

    db.RunCypher(
          db.Cyphers.Servos.Delete.cypher
        , validParams
        , errorCb     
        , ( result ) => { res.send( result ); } // What to do on success              
    );
})

router.post('/update/name', function(req, res) {

    const errorCb = error.init( req, res );

    const validationErrors = validateParams
                                .init( "Params ServoMaster.UpdateName" )
                                .ServoMaster.UpdateName(  req.params.id               
                                                        , req.params.name )
                                .GetExceptions();
    
    if ( validationErrors[0].errors.length !== 0 ) { errorCb.send( validationErrors ) };

    const validParams = {
                          servoId : req.params.id               
                        , name    : req.params.name
                        };

    db.RunCypher(
          db.Cyphers.Servos.Update.cypher
        , validParams
        , errorCb     
        , ( result ) => { res.send( result ); } // What to do on success              
    );
        
})

router.post('/update/location', function(req, res) {

    const errorCb = error.init( req, res );

    const validationErrors = validateParams
                                .init( "Params ServoMaster.UpdateLocation" )
                                .ServoMaster.UpdateLocation(  req.params.id              
                                                            , req.params.location )
                                .GetExceptions();
        
    if ( validationErrors[0].errors.length !== 0 ) { errorCb.send( validationErrors ) };
    
    const validParams = {
                          servoId  : req.params.id               
                        , location : req.params.location
                        };

    db.RunCypher(
          db.Cyphers.Servos.Update.cypher
        , validParams
        , errorCb     
        , ( result ) => { res.send( result ); } // What to do on success              
    );

})

router.post('/update/speed', function(req, res) {

    const errorCb = error.init(req, res);

    const validationErrors = validateParams
                                .init( "Params ServoMaster.UpdateSpeed" )
                                .ServoMaster.GetForId(  req.params.id             
                                                      , req.params.speed )
                                .GetExceptions();
    
    if ( validationErrors[0].errors.length !== 0 ) { errorCb.send( validationErrors ) };

    const validParams = {
                          servoId : req.params.id             
                        , speed   : req.params.speed
                        };

    db.RunCypher(
          db.Cyphers.Servos.Update.cypher
        , validParams
        , errorCb     
        , ( result ) => { res.send( result ); } // What to do on success              
    );
})

router.post('/update/pwm0Degrees', function(req, res) {

    const errorCb = error.init( req, res );

    const validationErrors = validateParams
                                    .init( "Params ServoMaster.UpdatePwm0Degrees" )
                                    .ServoMaster.UpdatePwm0Degrees(   req.params.id             
                                                                    , req.params.pwm0Degrees )
                                    .GetExceptions();
        
    if ( validationErrors[0].errors.length !== 0 ) { errorCb.send( validationErrors ) };

    const validParams = {
                          servoId     : req.params.id
                        , pwm0Degrees : req.params.pwm0Degrees
                        };

    db.RunCypher(
          db.Cyphers.Servos.Update.cypher
        , validParams
        , errorCb     
        , ( result ) => { res.send( result );} // What to do on success              
    );
})

router.post('/update/pwm180Degrees', function(req, res) {
    
    const errorCb = error.init( req, res );


    validateParams.UpdatePwm180Degrees( req.params.id
                                        , req.params.pwm180Degrees);

    const validationErrors = validateParams
                                        .init( "Params ServoMaster.UpdatePwm180Degrees" )
                                        .ServoMaster.UpdatePwm180Degrees(  req.params.id             
                                                                         , req.params.pwm180Degrees )
                                        .GetExceptions();
            
    if ( validationErrors[0].errors.length !== 0 ) { errorCb.send( validationErrors ) };
                                        
    const validParams = {
                          servoId       : req.params.id
                        , pwm180Degrees : req.params.pwm180Degrees
                        };

    db.RunCypher(
          db.Cyphers.Servos.Update.cypher
        , validParams
        , errorCb     
        , ( result ) => { res.send( result ); } // What to do on success              
    );
        
})



module.exports = router