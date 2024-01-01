export const saveFile = async (request, response, next) => {
  try {
    return response.status(global.CODES_HTTP.CREATED).json({ data: request.file.location });
  } catch (err) {
    return next(err);
  }
};
