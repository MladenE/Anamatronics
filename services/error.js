
const _response = "";

const _json = {};

exports.init = (req, res) => {          // Setup the error response with the values posted to the controller.
    _response = res;

    _json = {
        headers : req.headers
      , params  : req.params
      , message : ""
    }
}

exports.send = (errorMessage) => {      // Add the error to the alreadey created error.
    // Add logging
    _json.message = errorMessage;
    _response.send(_json);
}