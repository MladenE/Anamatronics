
// Require Neo4j
const neo4j = require('neo4j-driver').v1;
// Create Driver
const driver = new neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "neo"));
// Create Driver session
const session = driver.session();


exports.Cyphers = {
        Db : {
            Build                   : ""          // Create the database on account creation
        },
        ServoMaster: {
              getAll                : "MATCH (s:ServoMaster) RETURN s;"
            , getForId              : "MATCH (s:ServoMaster {id:{id}}) RETURN s;"
            , create                : "CREATE (s:ServoMaster {id:{id}, name:{name}, location:{location}, speed:{speed}, pwm0Degrees:{pwm0Degrees}, pwm180Degrees:{pwm180Degrees} });"
            , delete                : "MATCH (s:ServoMaster {id:{id}}) DELETE s;"
            , updateName            : "MATCH (s:ServoMaster {id:{id}}) SET s.name = {name} RETURN s;"
            , updateLocation        : "MATCH (s:ServoMaster {id:{id}}) SET s.location = {location} RETURN s;"
            , updateSpeed           : "MATCH (s:ServoMaster {id:{id}}) SET s.speed = {speed} RETURN s;"
            , updatePwm0Degrees     : "MATCH (s:ServoMaster {id:{id}}) SET s.pwm0Degrees = {pwm0Degrees} RETURN s;"
            , updatePwm180Degrees   : "MATCH (s:ServoMaster {id:{id}}) SET s.pwm180Degrees = {pwm180Degrees} RETURN s;"
        },
        Scenes : {
              GetAll                : "MATCH (s:Scene) RETURN s;"
            , GetForId              : "MATCH (s:Scene {id:{id}}) RETURN s;"
                                    // Create the new scene then create relationships with positions from passed in array.
            , Create                : "CREATE (:Scene {id:{sceneId}, name:{name}) WITH {actions} AS actions UNWIND actions as a MATCH (scene:Scene {id:{sceneId}) MATCH (action:Action {id: a.id}) CREATE (action)-[:SEQUENCE {position: a.position}]->(scene);"
            , Delete                : "MATCH (s:Scene {id:{sceneId}}) DETACH DELETE s"
                                    // Not a cypher?
            , Play                  : ""         
            , UpdateName            : "MATCH (s:Scene {id:{id}}) SET s.name = {name} RETURN s;"
            , UpdateAudioFile       : "MATCH (s:Scene {id:{id}}) SET s.audioFile = {audioFile} RETURN s;"            
        },
        Actions : {
              GetAllForScene        : "MATCH (s:Scene {id:{sceneId}})<-[sq:SEQUENCE]-(a:Action) RETURN a, sq.position as p ORDER BY p ASC;"
            //, AddToScene            : ""    // Remove: modify list on client then send array to update > delete all relationships > add new relationships
            //, DeleteFromScene       : ""    // Remove: modify list on client then send array to update > delete all relationships > add new relationships
                                    // Receives an array of actions. Deletes current relationships to Scene > creates new ones.
            , UpdateForScene        : "MATCH (s:Scene {id:{sceneId}})<-[sq:SEQUENCE]-() DELETE sq WITH {actions} AS actions UNWIND actions as act MATCH (sc:Scene {id:{sceneId}}) MATCH (a:Action {id: act.id}) CREATE (a)-[:SEQUENCE {position: act.position}]->(sc);"    
            , GetAll                : "MATCH (a:Action) RETURN a;"
            , GetForId              : "MATCH (a:Action {id:{id}}) RETURN a;"
            , Create                : "CREATE (:Action {id:{id}, name:{name} });"
            , Delete                : ""
            , UpdateName            : "MATCH (a:Action {id:{id}}) SET a.name = {name} RETURN a;"
            , UpdateNote            : "MATCH (a:Action {id:{id}}) SET a.note = {note} RETURN a;"
            , UpdateAudioFile       : "MATCH (a:Action {id:{id}}) SET a.audioFile = {audioFile} RETURN a;"
        },
        KeyFrames : {
              GetAllForAction       : "MATCH (a:Action {id:{actionId}})<-[:SEQUENCE]-(k:KeyFrame) RETURN k;"
            , DeleteFromAction      : ""        // KeyFrames can't stand alone; deleting it from an action is to delete it completely. Surrounding KeyFrames must be modified to fill the space.
            , UpdateOrderInAction   : ""
            , GetForId              : "MATCH (k:Keyframe {id:{id}}) RETURN k;"
            , Create                : ""
            , UpdateNote            : "MATCH (k:Keyframe {id:{id}}) SET k.note = {note} RETURN k;"
        }, 
        Servos : {
              GetAllForKeyFrame     : "MATCH (k:KeyFrame {id:{keyframeId}})<-[:BELONGS_TO]-(s:Servo) RETURN s;"
            , GetForId              : "MATCH (s:Servo {id:{id}}) RETURN s;"
            , UpdateNote            : "MATCH (s:Servo {id:{id}}) SET s.note = {note} RETURN s;"
        },
        Positions : {
              GetForServoId         : "MATCH (s:Servo {id:{servoId}})<-[:BELONGS_TO]-(p:Position) RETURN p;"
            , UpdatePosition        : ""
            , UpdateNote            : "MATCH (p:Position {id:{id}}) SET p.note = {note} RETURN p;"
        },
        Transitions : {
              GetAllForPosition     : ""    // Transitions are chained by :PREVIOUS. Get 1st that is attached to the Position then recursively??
            , UpdatePosition        : ""
            , UpdateNote            : "MATCH (t:Transition {id:{id}}) SET t.note = {note} RETURN t;"
        }
};

exports.RunCypher = function (cypher, parameters, errorCallback, callback) {

    const tx = session.beginTransaction();

    tx.run(cypher, parameters)
        .then(result => {
            //return result;
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