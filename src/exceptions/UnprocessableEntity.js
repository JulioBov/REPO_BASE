import AbstractError from './AbstractError.js';
class UnprocessableEntity extends AbstractError {
  constructor(message = 'Unable to process instructions.') {
    super(global.CODES_HTTP.UNPROCESSABLE_ENTITY, message);
  }
}

export default UnprocessableEntity;
