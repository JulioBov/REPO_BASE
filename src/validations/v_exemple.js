import joi from 'joi';

export const joiBase = joi.object().keys({
  base: joi.string().min(3).max(250).required().messages({
    'any.required': 'Campo Base é obrigatório',
    'string.empty': 'Campo Base é obrigatório',
    'string.min': 'O campo base deve ter ao menos 3 caracteres',
    'string.max': 'O campo base deve ter no máximo 250 caracteres',
  })
});


