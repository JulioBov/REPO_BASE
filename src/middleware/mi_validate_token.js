import jwt from 'jsonwebtoken';
import environments from '../enviroments.js';

export default async function validateToken(request, response, next) {
  try {
    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader) {
      return response.status(401).json({ message: 'Authorization header não encontrado.' });
    }

    const token = authorizationHeader.split(' ')[1];

    if (!token) {
      return response.status(401).json({ message: 'Token JWT não encontrado.' });
    }

    const decodedToken = jwt.verify(token, environments.KEY_JWT);
    request.userToken = decodedToken;
    next();
  } catch (err) {
    console.error('Erro na verificação do token:', err);
    return response.status(401).json({ message: 'Sem autorização', error: err.message });
  }
}
