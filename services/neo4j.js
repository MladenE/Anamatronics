
const validate = require('../helpers/validators');
// Require Neo4j
const neo4j = require('neo4j-driver').v1;
// Create Driver
const driver = new neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "neo"));
// Create Driver session
const session = req.driver.session();


exports.Cyphers =  {
        Servos : {
            Create     : {
                              cypher : ""
                            , params : (id, name, location, speed, pwm0Degrees, pwm180Degreed) => {
                                            validate.scope("Neo4j Cyphers.Servos.Create.Params");
                                            validate.test.servo.speed();
                                            validate.test.servo.pwmDegreesRange("pwm0Degrees", pwm0Degrees);
                                            validate.test.servo.pwmDegreesRange("pwm180Degrees", pwm180Degrees);
                                            validate.test.servo.pwmDegreesBalance(pwm0Degrees, pwm180Degrees);
                                            return { name:name, location:location, speed:speed, pwm0Degrees:pwm0Degrees, pwm180Degreed:pwm180Degreed };
                                        }
                         },
            ReadAll    : { cypher: "", params: {} },
            ReadSingle : {
                              cypher : ""
                            , params : (id) => {
                                            validate.scope("Neo4j Cyphers.Servos.ReadSingle.Params");
                                            validate.test.general.int("id", id);
                                            return { id:id };
                                        }
                         },
            Update     : { cypher: "", params: {id:null, name:null, location:null, speed:null, pwm0Degrees:null, pwm180Degreed:null} },
            Delete     : { cypher: "", params: {id:null} }  // etc...
        },
        Frames : {} // etc...
}

exports.RunCypher = function (cypher, parameters) {

    const tx = session.beginTransaction();

    tx.run(cypher, parameters)
        .then(result => {
            return result;
        })
        .catch(e => {
            // On error, Transaction gets rolled back.
            // Handle the error
            console.log(e);
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