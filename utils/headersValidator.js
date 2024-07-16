const config = require("../config");
const response = require("./response");

class HeaderValidator {
  validateAdminHeaders(headers) {
    let error;
    if (!headers.auth_token) {
      error = {
        param: "auth_token",
        type: "required",
      };
    }

    return error;
  }

  nonAuthAdminValidation(req, res, next) {
    let default_token = config.defaultAuthToken;

    let error = module.exports.validateAdminHeaders(req.headers);
    console.log(`\n NonAuthAdminValidation error ->> ${error}`);

    if (error) {
      response.error(res, error, req.headers.language);
    } else if (req.headers.auth_token) {
      if (default_token != req.headers.auth_token) {
        response.error(res, "INVALID_TOKEN", req.headers.language);
      } else {
        console.log(`\n NonAuthAdminValidation next ->>`);
        next();
      }
    }
  }
}

module.exports = new HeaderValidator();
