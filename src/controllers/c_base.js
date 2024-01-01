
export const saveBaseController = async (request, response, next) => {
  try {
    const result = await saveBaseService(request.userToken);
    return response.status(global.CODES_HTTP.OK).json({ message: 'Dados salvos com sucesso', data: result });
  } catch (error) {
    return next(error);
  }
};
