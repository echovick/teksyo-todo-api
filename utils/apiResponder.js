const ResponseStatus = require("./responseStatus");
const { HTTP_OK, HTTP_BAD_REQUEST } = require("../utils/responseStatus");

const successResponse = (response, data, message = "Successfull", code = HTTP_OK) => {
  response.status(code).json({
    status: true,
    message: message,
    data: data,
    status_code: code,
  });
};

const failureResponse = (response, message = "Failed", code = HTTP_BAD_REQUEST) => {
  response.status(code).json({
    status: false,
    message: message,
    status_code: code,
  });
};

module.exports = {successResponse, failureResponse};

