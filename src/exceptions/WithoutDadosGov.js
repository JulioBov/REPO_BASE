import AbstractError from './AbstractError.js';

class WithoutDadosGov extends AbstractError {
  constructor(message = 'Não encontrou os dados no governo') {
    super(global.CODES_HTTP.WITHOUT_DADOS_GOV, message);
  }
}

export default WithoutDadosGov;
