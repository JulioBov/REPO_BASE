import AbstractError from './AbstractError.js';
class InternalServerError extends AbstractError {
  constructor(message = 'Internal error') {
    super(global.CODES_HTTP.INTERNAL_SERVER_ERROR, message);
  }
}

export default InternalServerError;
