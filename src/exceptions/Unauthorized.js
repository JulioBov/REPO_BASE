import AbstractError from './AbstractError.js';
class Unauthorized extends AbstractError {
  constructor(message = 'Unauthorized') {
    super(global.CODES_HTTP.UNAUTHORIZED, message);
  }
}

export default Unauthorized;
