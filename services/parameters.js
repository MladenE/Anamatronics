
const validate = require('../helpers/validators');

var _id         = ( id )          => {
                                          validate.test.general.id("id", id);
                                     };

var _name       = ( name )        => {
                                          validate.test.general.name("name", name);
                                     };

var _note       = ( note )        => {
                                          validate.test.general.note("note", note);  
                                     };

var _idId       = ( id1, id2 )    => {
                                          validate.test.general.id("id1", id1);
                                          validate.test.general.id("id2", id2);
                                     };

var _idName     = ( id, name )    => {      
                                          validate.test.general.id("id", id);
                                          validate.test.general.name("name", name);  
                                     };

var _idNote     = ( id, note )    => {
                                          validate.test.general.id("id", id);
                                          validate.test.general.note("note", note);
                                     };

var _idFilePath = ( id, filePath )=> {
                                          validate.test.general.id("id", id);
                                          validate.test.general.filePath("filePath", filePath);
                                     };

var _idPosition = ( id, position )=> {
                                          validate.test.general.id("id", id);
                                          validate.test.general.filePath("position", position);
                                     };                                           


exports.init          = ( scope ) => { validate.init(scope); };
exports.GetExceptions = ()        => { return validate.getExceptions(); };

exports.ServoMaster = {
      GetForId                      : ( id )        => _id      ( id ),
      Delete                        : ( id )        => _id      ( id ),
      UpdateName                    : ( id, name )  => _idName  ( id, name ),   
      Create                        : ( name, location, speed, pwm0Degrees, pwm180Degrees) => {
                                                      validate.test.general.name("name", name);  
                                                      validate.test.servo.location("location", location);
                                                      validate.test.servo.speed("speed", speed);
                                                      validate.test.servo.pwmDegreesRange("pwm0Degrees", pwm0Degrees);
                                                      validate.test.servo.pwmDegreesRange("pwm180Degrees", pwm180Degrees);
                                                      validate.test.servo.pwmDegreesBalance(pwm0Degrees, pwm180Degrees);                                                
                                                },                                       
      UpdateLocation                : ( id, location ) => {
                                                      validate.test.general.id("ServoMasterId", id);
                                                      validate.test.servo.location("location", location);
                                                },
      UpdateSpeed                   : ( id, speed ) => {
                                                      validate.test.general.id("id", id);
                                                      validate.test.servo.speed("speed", speed);
                                                },
      UpdatePwm0Degrees             : ( id, pwm0Degrees, pwm180Degrees ) => {
                                                      validate.test.general.id("ServoMasterId", id);
                                                      validate.test.servo.pwmDegreesRange("pwm0Degrees", pwm0Degrees);
                                                      validate.test.servo.pwmDegreesBalance(pwm0Degrees, pwm180Degrees);
                                                },
      UpdatePwm180Degrees           : ( id, pwm0Degrees, pwm180Degrees ) => {
                                                      validate.test.general.id("ServoMasterId", id);
                                                      validate.test.servo.pwmDegreesRange("pwm180Degrees", pwm180Degrees);
                                                      validate.test.servo.pwmDegreesBalance(pwm0Degrees, pwm180Degrees);
                                                }
    }

exports.Scene = {
      GetForId                      : ( id )           => _id         ( id ),
      Delete                        : ( id )           => _id         ( id ),
      Play                          : ( id )           => _id         ( id ),
      UpdateName                    : ( id, name )     => _idName     ( id, name ),
      UpdateAudioFile               : ( id, filePath ) => _idFilePath ( id, filePath ),
      ActionAdd                     : ( id1, id2 )     => _idId       ( id1, id2 ),
      ActionGetAllForSceneId        : ( id )           => _id         ( id ),
      ActionDelete                  : ( id1, id2 )     => _idId       ( id1, id2 ),
      ActionUpdateOrder             : ( id, actionPositions ) =>  {
                                                                  validate.test.general.id("SceneId", id);
                                                                  actionPositions.map((x, y) => {
                                                                                                validate.test.general.id("an actionId", x);
                                                                                                validate.test.general.position("an action order position", y);
                                                                                                });
                                                            },
      Create                        : ( name, actionIds ) => {
                                                                  validate.test.general.name("name", name);
                                                                  actionIds.map((x) => validate.test.general.id("an actionId", x) );
                                                            }
    }

exports.Action = {
      GetForId                      : ( id )           => _id         ( id ),
      Delete                        : ( id )           => _id         ( id ),
      UpdateName                    : ( id, name )     => _idName     ( id, name ),
      UpdateNote                    : ( id, note )     => _idNote     ( id, note ),
      UpdateAudioFile               : ( id, filePath ) => _idFilePath ( id, filePath ),
      Create                        : ( name )         => _name       ( name ),
      KeyFrameGetAllForActionId     : ( id )           => _id         ( id ),
      KeyFrameDelete                : ( id1, id2 )     => _idId       ( id1, id2 ),
      KeyFrameUpdateOrder           : ( id, keyframePositions ) =>  {
                                                                        validate.test.general.id("SceneId", id);
                                                                        keyframePositions.map((x, y) => {
                                                                                                      validate.test.general.id("a keyframeId", x);
                                                                                                      validate.test.general.position("a keyframe order position", y);
                                                                                                      });
                                                                  }
    }

exports.KeyFrame = {
      
      GetForId                      : ( id )           => _id         ( id ),
      UpdateNote                    : ( id, note )     => _idNote     ( id, note ),  
      ServoGetAllForKeyFrameId      : ( id )           => _id         ( id ),
      Create                        : ( note, duration ) =>           { 
                                                                              validate.test.general.note( note );
                                                                              validate.test.servo.speed( duration );
                                                                        }
    }
    
exports.Servo = {
	GetForId                      : ( id )           => _id         ( id ),        
      UpdateNote                    : ( id, note )     => _idNote     ( id, note ),
      PositionGetAllForServoId      : ( id )           => _id         ( id )
    }

exports.Position = {
      UpdateNote                    : ( id, note )     => _idNote     ( id, note ),
      UpdatePosition                : ( id, position ) => _idPosition ( id, position ),
      TransitionGetAllForPositionId : ( id )           => _id         ( id ),
    }

exports.Transition = {
      UpdateNote                    : ( id, note )     => _idNote     ( id, note ),
	UpdatePosition                : ( id, position ) => _idPosition ( id, position )
    }
