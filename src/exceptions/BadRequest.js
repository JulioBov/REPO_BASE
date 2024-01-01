import AbstractError from './AbstractError.js';
class BadRequest extends AbstractError {
  constructor(message = 'Invalid Information') {
    super(global.CODES_HTTP.BAD_REQUEST, message);
  }
}

export default BadRequest;
