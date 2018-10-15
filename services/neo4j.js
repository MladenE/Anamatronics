
// Require Neo4j
const neo4j = require('neo4j-driver').v1;
// Create Driver
const driver = new neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "neo"));
// Create Driver session
const session = req.driver.session();


exports.Cyphers = {
        Db : {
            Build                   : ""          // Create the database on account creation
        },
        ServoMaster: {
              getAll                : ""
            , getForId              : ""
            , create                : ""
            , delete                : ""
            , updateName            : ""
            , updateLocation        : ""
            , updateSpeed           : ""
            , updatePwm0Degrees     : ""
            , updatePwm180Degrees   : ""
        },
        Scenes : {
              GetAll                : ""
            , GetForId              : ""
            , Create                : ""
            , Delete                : ""
            , Play                  : ""         // ? Not a cypher
            , UpdateName            : ""
            , UpdateAudioFile       : ""            
        },
        Actions : {
              GetAllForScene        : ""
            , AddToScene            : ""
            , DeleteFromScene       : ""
            , UpdateOrderInScene    : ""
            , GetAll                : ""
            , GetForId              : ""
            , Create                : ""
            , Delete                : ""
            , UpdateName            : ""
            , UpdateNote            : ""
            , UpdateAudioFile       : ""
        },
        KeyFrames : {
              GetAllForAction       : ""
            , DeleteFromAction      : ""        // KeyFrames can't stand alone; deleting it from an action is to delete it completely. Surrounding KeyFrames must be modified to fill the space.
            , UpdateOrderInAction   : ""
            , GetForId              : ""
            , Create                : ""
            , UpdateNote            : ""
        }, 
        Servos : {
              GetAllForKeyFrame     : ""
            , GetForId              : ""
            , UpdateNote            : ""
        },
        Positions : {
              GetForServoId         : ""
            , UpdatePosition        : ""
            , UpdateNote            : ""
        },
        Transitions : {
              GetAllForPosition     : ""
            , UpdatePosition        : ""
            , UpdateNote            : ""
        }
};

exports.RunCypher = function (cypher, parameters, errorCallback, callback) {

    const tx = session.beginTransaction();

    tx.run(cypher, parameters)
        .then(result => {
            return result;
            callback(result);
        })
        .catch(e => {
            // On error, Transaction gets rolled back.
            // Handle the error
            //console.log(e);
            errorCallback.send(e);       // Response passed in from controller.
        })
        .then(() => {
            // All OK. Transaction is commited.
            // Close the Session
            return session.close();
        })
        .then(() => {
            // Close the Driver
            return driver.close();
        });

}