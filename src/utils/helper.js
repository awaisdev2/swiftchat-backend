export const successResponse = (
  res,
  data,
  message = "Success",
  status = 200
) => {
  return res.status(status).json({
    status: "success",
    message,
    data,
  });
};

export const errorResponse = (
  res,
  error,
  message = "Something went wrong",
  status = 500
) => {
  return res.status(status).json({
    status: "error",
    message,
    error,
  });
};
