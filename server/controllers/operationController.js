const operationController = {};

const createErr = (errInfo) => {
  const { method, type, err } = errInfo;
  return {
    log: `promptController.${method} ${type}: ERROR: ${
      typeof err === "object" ? JSON.stringify(err) : err
    }`,
    message: {
      err: `Error occurred in userController.${method}. Check server logs for more details.`,
    },
  };
};

operationController.executeOperation = (req, res, next) => {
  const { operation } = req.body;
  res.locals.operation = operation;
  return next();
};

module.exports = operationController;
