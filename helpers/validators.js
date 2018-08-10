
/*
    Regex validators for all user inputs and data going to the DB
*/
var _validationScope = "Scope not set";

var _exception = ( inputName, errMessage ) => { return 'In ' + _validationLocation + ' ' + inputName + ' ' + errMessage; }

exports.scope = ( validationScope ) => { _validationScope = validationScope }

exports.constants = ( ) => {
    servos : 
    {
        minPwmDegreesRange : 1000
    }
}

exports.test = ( ) => {
    
    var validators = {
          general :
            {
                  int    : (inputName, val)  => { if ( !"/^\d+$/".test(val) )                                  throw _exception( inputName, "must be a number." ) }
                , string : ""
                , name   : (inputName, val)  => { if ( !"^(?=.*[a-zA-Z\d].*)[a-zA-Z\d\.-]{1,30}$".test(val) )  throw _exception( inputName, "is invalid." ) } // at least 1 character or number. lenght between 1 and 30. specials chars . -
                , lessThanX : ( val, x ) => {}
                , greaterThanX : (val, x) => {}
            }
        , servo : 
            {
                  speed         : ""
                , pwmDegreesRange     : (inputName, val)  => { if ( val < 1000 || val > 2500 ) throw _exception( inputName, "is out of range." ) }                   // is a number in range
                , pwmDegreesBalance   : (min, max)        => { if ( min > max )                throw _exception( '', "pwm0Degrees must be less than pwm180Degrees." ) } // pwm0Degrees is less than pwm180Degrees
            }
        , frame // etc...
    }
    
    return validators;

}

