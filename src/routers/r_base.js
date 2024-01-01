import { Router } from 'express';
import { saveBaseController } from '../controllers/c_base.js';
import validationPayload from '../middleware/mi_validate_payload.js';
import validateToken from '../middleware/mi_validate_token.js';
import { joiBase } from '../validations/v_exemple.js';

const route = Router();
// Essa rota já valida o token e o payload antes de entrar no controller
route.post('/dashboard', validateToken,  validationPayload(joiBase), saveBaseController);

export default route;
