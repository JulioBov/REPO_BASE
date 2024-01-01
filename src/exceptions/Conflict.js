import AbstractError from './AbstractError.js';

class Conflict extends AbstractError {
  constructor(message = 'Invalid Information') {
    super(global.CODES_HTTP.CONFLICT, message);
  }
}

export default Conflict;
