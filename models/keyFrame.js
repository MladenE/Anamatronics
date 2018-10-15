
const db = require('../services/neo4j')


exports.getAllForAction = function (actionId, cb) {

}

exports.deleteFromAction = function (actionId, keyFrameId, cb) {
    
}

exports.updateOrderInAction = function (actionId, positions, cb) {

}


exports.getForId = function (keyFrameId, cb) {
    
}

exports.create = (keyFrameNote, db, query, params, cb) => {

    return db(query, params);

    // or this 
    
    const createServo = db.Cyphers.Servos.Create;
    db.RunCypher(
        createServo.cypher,
        createServo.params()
    )
}

exports.updateNote = function (keyFrameId, keyFrameNote, cb) {
    
}
