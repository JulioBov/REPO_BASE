import AbstractError from './AbstractError.js';

class Forbidden extends AbstractError {
  constructor(message = 'Forbidden') {
    super(global.CODES_HTTP.FORBIDDEN, message);
  }
}

export default Forbidden;
