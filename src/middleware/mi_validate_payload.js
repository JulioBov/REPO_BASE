import UnprocessableEntity from '../exceptions/UnprocessableEntity.js';

export const validationPayload = (rules) => async (request, response, next) => {
  const { error, value } = rules.validate(request.body);
  if (error) {
    const { details } = error;
    const code = details.map((i) => i.message).join(',');
    next(new UnprocessableEntity(code));
  } else {
    request.body = value;
    next();
  }
};

export default validationPayload;
