import AbstractError from './AbstractError.js';

class NotFound extends AbstractError {
  constructor(message = 'Resource not found') {
    super(global.CODES_HTTP.NOT_FOUND, message);
  }
}

export default NotFound;
