
const _request;
const _response;

const _json;

exports.init = (req, res) => {          // Setup the error response with the values posted to the controller.
    _request  = req;
    _response = res;

    _json = {
        headers : _request.headers
      , params  : _request.params
      , message : ""
    }
}

exports.send = (errorMessage) => {      // Add the error to the alreadey created error.
    // Add logging
    _json.message = errorMessage;
    _response.send(_json);
}