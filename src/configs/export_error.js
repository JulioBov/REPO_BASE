import logger from './logger.js';

export default function exportError(err, req, res) {
  const { statusCode, message, response } = err;
  const logError = objectLogError(req, err, statusCode);

  if (statusCode === global.CODES_HTTP.UNPROCESSABLE_ENTITY) {
    logger.info({ message: logError });
  } else if (statusCode === global.CODES_HTTP.NOT_FOUND) {
    logger.warn({ message: logError });
  } else {
    logger.error({ message: logError });
  }

  if (response?.status !== undefined) {
    return res.status(response.status).json({ message: response.data.message });
  }

  if (statusCode === global.CODES_HTTP.FORBIDDEN || statusCode === global.CODES_HTTP.NOT_FOUND) {
    return res.status(statusCode).json({ message });
  }

  if (statusCode === undefined || statusCode === global.CODES_HTTP.INTERNAL_SERVER_ERROR) {
    return res.status(global.CODES_HTTP.INTERNAL_SERVER_ERROR).json({ message: message.toString() });
  }

  return res.status(statusCode).json({ message });
}

function objectLogError(req, err, statusCode) {
  const error = `Path: ${req.route !== undefined ? req.route.path : 'Invalid Route'}
      || Method: ${req.method}
      || User Id: ${req.user_id !== undefined ? req.user_id : 'Unknown user'}
      || Body: ${req.body !== undefined ? JSON.stringify(req.body) : 'Not Body'}
      || Host: ${req.headers !== undefined ? req.headers.host : 'Not headers'}
      || Params: ${req.params !== undefined ? JSON.stringify(req.params) : 'Not Params'}
      || Original URL: ${req.originalUrl !== undefined ? req.originalUrl : 'Not Original Url'}
      || Ip: ${req.headers['x-forwarded-for'] || req.socket.remoteAddress}
      || StatusCode: ${statusCode}
      || Error: ${JSON.stringify(err)}
      || Stack: ${err.stack !== undefined ? err.stack : 'Not stack'}}`;
  return error;
}
