
exports.error = (res, message, statusCode = 400) => {
  const resData = {
    error: true,
    message: message,
    statusCode: statusCode,
    // messageCode: code,
  };
  return res.status(statusCode).json(resData);
};

exports.success = (res, statusCode = "", data = {},message) => {
  const resData = {
    error: false,
    message: message,
    statusCode: statusCode,
    // messageCode: code,
    data,
  };
  return res.status(statusCode).json(resData);
};

// exports.customSuccess = (response) => {
//   return res.status(200).json(response);
// };

exports.customResponse = (res, statusCode = 200, data = {}, message) => {
  const resData = {
    error: true,
    message: message,
    statusCode: statusCode,
    data,
  };
  return res.status(statusCode).json(resData);
};

exports.customErrorResponse = (res, statusCode = 200,message,errors = {}) => {
  const resData = {
    error: true,
    statusCode: statusCode,
    message: message,
    errors,
  };
  return res.status(statusCode).json(resData);
};

exports.notFound = (res, code, statusCode = 404) => {
  const resData = {
    error: true,
    statusCode: statusCode,
    message:"Not Found",
    data: {},
    messageCode: code,
  };
  return res.status(statusCode).send(resData);
};


