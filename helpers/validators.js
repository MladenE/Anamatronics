
/*
    Regex validators for all user inputs and data going to the DB
*/
var _validationScope = "Scope not set";

var _exception = ( inputName, errMessage ) => { return 'In ' + _validationLocation + ' ' + inputName + ' ' + errMessage; }

exports.scope = ( validationScope ) => { _validationScope = validationScope }

exports.constants = {
    servos : 
    {
          minPwmDegreesRange : 1000
        , maxPwmDegreesRange : 2500
    }
}

exports.test = {
          general :
            {
                  id         : (inputName, val)  => { if ( !"/^[0-9]{1,6}".test(val) )                               throw _exception( inputName, "is not a number between 1 and 6 characters long." ) }
                , name       : (inputName, val)  => { if ( !"/^(?=.*[a-zA-Z\d].*)[a-zA-Z\d\.-]{1,30}$/".test(val) )  throw _exception( inputName, "is invalid." ) } // at least 1 character or number. lenght between 1 and 30. specials chars . -
                , position   : (inputName, val)  => { if ( !"/^[0-9]{1,3}".test(val) )                               throw _exception( inputName, "is not a number between 1 and 3 characters long." ) }
                , note : ""
                , filePath : ""
            }
        , servo : 
            {
                  location          : (inputName, val)  => { if ( !"/^[0-9]{1,2}".test(val) )                               throw _exception( inputName, "is not a number between 1 and 2 characters long." ) }
                , speed             : (inputName, val)  => { if ( !"/^[0-9]\.[0-9]+$/".test(val) )                          throw _exception( inputName, "must be a positive floating point number." ) }
                , pwmDegrees        : (inputName, val)  => { if ( !"/^[0-9]{1,4}".test(val) )                               throw _exception( inputName, "is not a number between 1 and 4 characters long." ) }
                , pwmDegreesRange   : (inputName, val)  => { if ( val < constants.servos.minPwmDegreesRange || val > constants.servos.maxPwmDegreesRange )  throw _exception( inputName, "is out of range of servo constants." ) }                      // is a number in range
                , pwmDegreesBalance : (min, max)        => { if ( min > max )                                                                               throw _exception( '', "pwm0Degrees must be less than pwm180Degrees." ) } // pwm0Degrees is less than pwm180Degrees
            }
}

