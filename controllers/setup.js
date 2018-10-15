const   express      = require('express')
      , router       = express.Router()
const db             = require('../services/neo4j')
const validateParams = require('../services/parameters').ServoMaster
const error          = require('../services/error')


// Read/Get all servos
router.get('/', function(req, res) {

    const errorCb = error.init(req, res);

    try
    {
        const createServo = db.Cyphers.Servos.ReadAll;

        db.RunCypher(
              createServo.cypher
            , {}
            , errorCb     
            , (result) => {res.send(result);} // What to do on success              
        );
    }
    catch (err)
    {
        errorCb.send(err);
    }
})

// Read/Get specific servo
router.get('/:id', function(req, res) {

    const errorCb = error.init(req, res);

    try
    {
        const createServo = db.Cyphers.Servos.ReadSingle;        
        validateParams.ReadSingle(req.params.id);
        const validParams = { servoId : req.params.id };

        db.RunCypher(
              createServo.cypher
            , validParams
            , errorCb     
            , (result) => {res.send(result);} // What to do on success              
        );
    }
    catch (err)
    {
        errorCb.send(err);
    }
})

// Create new Servo
router.post('/create/', auth, function(req, res) {
    //newName = req.user.newName
    /*
        - check values
          - return validation errors to the client
        - create a POCO to send to the DB
        - update the db
          - send callback to return response to the client
    */
    const errorCb = error.init(req, res);

    try
    {
        const createServo = db.Cyphers.Servos.Create;
        validateParams.Create(req.params.name
                            , req.params.location        
                            , req.params.speed           
                            , req.params.pwm0Degrees
                            , req.params.pwm180Degrees);

        const validParams = {
                              name           : req.params.name
                            , location       : req.params.location        // GPIO pin number
                            , speed          : req.params.speed           // float i.e 0.12
                            , pwm0Degrees    : req.params.pwm0Degrees
                            , pwm180Degrees  : req.params.pwm180Degrees
                            };

        db.RunCypher(
              createServo.cypher
            , validParams
            , errorCb     
            , (result) => {res.send(result);} // What to do on success              
        );
    }
    catch (err)
    {
        errorCb.send(err);
    }
    
})

router.delete('/delete/:id', function(req, res) {

    const errorCb = error.init(req, res);

    try
    {
        const createServo = db.Cyphers.Servos.Delete;
        validateParams.Delete(req.params.id);
        const validParams = { servoId : req.params.id };

        db.RunCypher(
            createServo.cypher
            , validParams
            , errorCb     
            , (result) => {res.send(result);} // What to do on success              
        );
    }
    catch (err)
    {
        errorCb.send(err);
    }
})

router.post('/update/name', auth, function(req, res) {

    const errorCb = error.init(req, res);

    try
    {
        const createServo = db.Cyphers.Servos.Update;

        validateParams.UpdateName( req.params.id               
                                 , req.params.name);

        const validParams = {
                              servoId : req.params.id               
                            , name    : req.params.name
                            };

        db.RunCypher(
              createServo.cypher
            , validParams
            , errorCb     
            , (result) => {res.send(result);} // What to do on success              
        );
    }
    catch (err)
    {
        errorCb.send(err);
    }
})

router.post('/update/location', auth, function(req, res) {

    const errorCb = error.init(req, res);

    try
    {
        const createServo = db.Cyphers.Servos.Update;

        validateParams.UpdateLocation( req.params.id               
                                     , req.params.location);

        const validParams = {
                             servoId  : req.params.id               
                           , location : req.params.location
        };

        db.RunCypher(
              createServo.cypher
            , validParams
            , errorCb     
            , (result) => {res.send(result);} // What to do on success              
        );
    }
    catch (err)
    {
        errorCb.send(err);
    }
})

router.post('/update/speed', auth, function(req, res) {

    const errorCb = error.init(req, res);

    try
    {
        const createServo = db.Cyphers.Servos.Update;

        validateParams.UpdateSpeed( req.params.id             
                                  , req.params.speed);

        const validParams = {
                             servoId : req.params.id             
                           , speed   : req.params.speed
                            };

        db.RunCypher(
              createServo.cypher
            , validParams
            , errorCb     
            , (result) => {res.send(result);} // What to do on success              
        );
    }
    catch (err)
    {
        errorCb.send(err);
    }
})

router.post('/update/pwm0Degrees', auth, function(req, res) {

    const errorCb = error.init(req, res);

    try
    {
        const createServo = db.Cyphers.Servos.Update;

        validateParams.UpdatePwm0Degrees( req.params.id
                                        , req.params.pwm0Degrees);

        const validParams = {
                             servoId     : req.params.id
                           , pwm0Degrees : req.params.pwm0Degrees
                            };

        db.RunCypher(
              createServo.cypher
            , validParams
            , errorCb     
            , (result) => {res.send(result);} // What to do on success              
        );
    }
    catch (err)
    {
        errorCb.send(err);
    }
})

router.post('/update/pwm180Degrees', auth, function(req, res) {
    
    const errorCb = error.init(req, res);

    try
    {
        const createServo = db.Cyphers.Servos.Update;

        validateParams.UpdatePwm180Degrees( req.params.id
                                          , req.params.pwm180Degrees);

        const validParams = {
                             servoId       : req.params.id
                           , pwm180Degrees : req.params.pwm180Degrees
                            };

        db.RunCypher(
              createServo.cypher
            , validParams
            , errorCb     
            , (result) => {res.send(result);} // What to do on success              
        );
    }
    catch (err)
    {
        errorCb.send(err);
    }
})



module.exports = router