import STATUS_CODE from "../constants/statusCodes.js";

export const errorHandler = (error, req, res, next) => {
  const statusCode =
    res.statusCode === STATUS_CODE.OK
      ? STATUS_CODE.INTERNAL_SERVER_ERROR
      : res.statusCode;
  res.status(statusCode);
  res.send({
    message: error.message,
    stack: process.env.NODE_ENV === "production" ? null : error.stack,
  });
};
