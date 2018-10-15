
const validate = require('../helpers/validators');

var _id         = ( scope, id )          => {
                                            validate.scope(scope);
                                            validate.test.general.id("id", id);
                                            };

var _name       = ( scope, name )        => {
                                            validate.scope(scope);
                                            validate.test.general.name("name", name);
                                            };

var _note       = ( scope, note )        => {
                                            validate.scope(scope);
                                            validate.test.general.note("note", note);  
                                            };

var _idId       = ( scope, id1, id2 )    => {
                                            validate.scope(scope);
                                            validate.test.general.id("id1", id1);
                                            validate.test.general.id("id2", id2);
                                            };

var _idName     = ( scope, id, name )    => {      
                                            validate.scope(scope);
                                            validate.test.general.id("id", id);
                                            validate.test.general.name("name", name);  
                                            };

var _idNote     = ( scope, id, note )    => {
                                            validate.scope(scope);
                                            validate.test.general.id("id", id);
                                            validate.test.general.note("note", note);
                                            };

var _idFilePath = ( scope, id, filePath )=> {
                                            validate.scope(scope);
                                            validate.test.general.id("id", id);
                                            validate.test.general.filePath("filePath", filePath);
                                            };

var _idPosition = ( scope, id, position )=> {
                                            validate.scope(scope);
                                            validate.test.general.id("id", id);
                                            validate.test.general.filePath("position", position);
                                            };                                           


exports.ServoMaster = {
      GetForId                      : ( id )        => _id      ( "Params ServoMaster.ReadSingle", id ),
      Delete                        : ( id )        => _id      ( "Params ServoMaster.Delete", id ),
      UpdateName                    : ( id, name )  => _idName  ("Params ServoMaster.UpdateName", id, name ),   
      Create                        : ( name, location, speed, pwm0Degrees, pwm180Degrees) => {
                                                      validate.scope("Params ServoMaster.Create");
                                                      validate.test.general.name("name", name);  
                                                      validate.test.servo.location("location", location);
                                                      validate.test.servo.speed("speed", speed);
                                                      validate.test.servo.pwmDegreesRange("pwm0Degrees", pwm0Degrees);
                                                      validate.test.servo.pwmDegreesRange("pwm180Degrees", pwm180Degrees);
                                                      validate.test.servo.pwmDegreesBalance(pwm0Degrees, pwm180Degrees);                                                
                                                },                                       
      UpdateLocation                : ( id, location ) => {
                                                      validate.scope("Params ServoMaster.UpdateLocation");
                                                      validate.test.general.id("ServoMasterId", id);
                                                      validate.test.servo.location("location", location);
                                                },
      UpdateSpeed                   : ( id, speed ) => {
                                                      validate.scope("Params ServoMaster.UpdateSpeed");
                                                      validate.test.general.id("id", id);
                                                      validate.test.servo.speed("speed", speed);
                                                },
      UpdatePwm0Degrees             : ( id, pwm0Degrees, pwm180Degrees ) => {
                                                      validate.scope("Params ServoMaster.UpdatePwm0Degrees");
                                                      validate.test.general.id("ServoMasterId", id);
                                                      validate.test.servo.pwmDegreesRange("pwm0Degrees", pwm0Degrees);
                                                      validate.test.servo.pwmDegreesBalance(pwm0Degrees, pwm180Degrees);
                                                },
      UpdatePwm180Degrees           : ( id, pwm0Degrees, pwm180Degrees ) => {
                                                      validate.scope("Params ServoMaster.UpdatePwm180Degrees");
                                                      validate.test.general.id("ServoMasterId", id);
                                                      validate.test.servo.pwmDegreesRange("pwm180Degrees", pwm180Degrees);
                                                      validate.test.servo.pwmDegreesBalance(pwm0Degrees, pwm180Degrees);
                                                }
    }

exports.Scene = {
      GetForId                      : ( id )           => _id         ( "Params Scene.GetForId", id ),
      Delete                        : ( id )           => _id         ( "Params Scene.Delete", id ),
      Play                          : ( id )           => _id         ( "Params Scene.Play", id ),
      UpdateName                    : ( id, name )     => _idName     ( "Params Scene.UpdateName", id, name ),
      UpdateAudioFile               : ( id, filePath ) => _idFilePath ( "Params Scene.UpdateAudioFile", id, filePath ),
      ActionAdd                     : ( id1, id2 )     => _idId       ( "Params Scene.ActionAdd", id1, id2 ),
      ActionGetAllForSceneId        : ( id )           => _id         ( "Params Scene.ActionGetAll", id ),
      ActionDelete                  : ( id1, id2 )     => _idId       ( "Params Scene.ActionDelete", id1, id2 ),
      ActionUpdateOrder             : ( id, actionPositions ) =>  {
                                                                  validate.scope("Params Scene.ActionUpdateOrder");
                                                                  validate.test.general.id("SceneId", id);
                                                                  actionPositions.map((x, y) => {
                                                                                                validate.test.general.id("an actionId", x);
                                                                                                validate.test.general.position("an action order position", y);
                                                                                                });
                                                            },
      Create                        : ( name, actionIds ) => {
                                                                  validate.scope("Params Scene.Create");
                                                                  validate.test.general.name("name", name);
                                                                  actionIds.map((x) => validate.test.general.id("an actionId", x) );
                                                            }
    }

exports.Action = {
      GetForId                      : ( id )           => _id         ( "Params Action.GetForId", id ),
      Delete                        : ( id )           => _id         ( "Params Action.Delete", id ),
      UpdateName                    : ( id, name )     => _idName     ( "Params Action.UpdateName", id, name ),
      UpdateNote                    : ( id, note )     => _idNote     ( "Params Action.UpdateNote", id, note ),
      UpdateAudioFile               : ( id, filePath ) => _idFilePath ( "Params Action.UpdateAudioFile", id, filePath ),
      Create                        : ( name )         => _name       ( "Params Action.Create", name ),
      KeyFrameGetAllForActionId     : ( id )           => _id         ( "Params Action.KeyFrameGetAllForId", id ),
      KeyFrameDelete                : ( id1, id2 )     => _idId       ( "Params Action.KeyFrameDelete", id1, id2 ),
      KeyFrameUpdateOrder           : ( id, keyframePositions ) =>  {
                                                                        validate.scope("Params Action.KeyFrameUpdateOrder");
                                                                        validate.test.general.id("SceneId", id);
                                                                        keyframePositions.map((x, y) => {
                                                                                                      validate.test.general.id("a keyframeId", x);
                                                                                                      validate.test.general.position("a keyframe order position", y);
                                                                                                      });
                                                                  }
    }

exports.KeyFrame = {
      
      GetForId                      : ( id )           => _id         ( "Params KeyFrame.GetForId", id ),
      UpdateNote                    : ( id, note )     => _idNote     ( "Params KeyFrame.UpdateNote", id, note ),
      Create                        : ( note )         => _note       ( "Params KeyFrame.Create", note ),      
      ServoGetAllForKeyFrameId      : ( id )           => _id         ( "Params KeyFrame.ServoGetAllForId", id )
    }
    
exports.Servo = {
	GetForId                      : ( id )           => _id         ( "Params Servo.GetForId", id ),        
      UpdateNote                    : ( id, note )     => _idNote     ( "Params Servo.UpdateNote", id, note ),
      PositionGetAllForServoId      : ( id )           => _id         ( "Params Servo.PositionGetAllForServoId", id )
    }

exports.Position = {
      UpdateNote                    : ( id, note )     => _idNote     ( "Params Position.UpdateNote", id, note ),
      UpdatePosition                : ( id, position ) => _idPosition ( "Params Position.UpdatePosition", id, position ),
      TransitionGetAllForPositionId : ( id )           => _id         ( "Params Transition.GetAllForPosition", id ),
    }

exports.Transition = {
      UpdateNote                    : ( id, note )     => _idNote     ( "Params Transition.UpdateNote", id, note ),
	UpdatePosition                : ( id, position ) => _idPosition ( "Params Transition.UpdatePosition", id, position )
    }
