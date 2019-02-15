const db = require('../services/neo4j');

exports.getAllForAction = function (actionId, cb) {

}

exports.deleteFromAction = function (actionId, keyFrameId, cb) {
    
}

exports.updateOrderInAction = function (actionId, positions, cb) {

}


exports.getForId = function (keyFrameId, cb) {
    
}

exports.create = (servoMasters, cb) => {


    // Called via cb from GetServos

    // Calls private function to format the javascript object
    var unwindData = _formatKeyframeObjectForNeo4j( servoMasters );

    // Calls neo4j to create the keyframes
    db.RunCypher(
        db.Cyphers.Servos.Create.cypher
      , unwindData
      , errorCb     
      , ( result ) => { res.send( result ); } // What to do on success              
  );

}

exports.updateNote = function (keyFrameId, keyFrameNote, cb) {
    
}

// Only used by Neo4j because it's the only DB that uses UNWIND
function _formatKeyframeObjectForNeo4j( servoMasters )
{
    // Create new data object and add id and note for new KeyFrame
    // See NOTES > "Example KeyFrame object for Neo4j"
    const unwindData = {
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
            , note      : ''
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
    
    return unwindData;    
}