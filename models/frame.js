
const db = require('../services/neo4j')

exports.create = (db, query, params, cb) => {

    return db(query, params);

    // or this 
    
    const createServo = db.Cyphers.Servos.Create;
    db.RunCypher(
        createServo.cypher,
        createServo.params()
    )
}

exports.getAll = function (cb) {

}

exports.getForId = function (sequenceId, cb) {
    
}

exports.update = function (sequenceData, cb) {
    
}

exports.deleteForId = function (sequenceId, cb) {
    
}