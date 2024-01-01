import Base from "../models/m_Base.js";
import { insert } from "../repositories/db_base.js";

export const saveBaseService = async (body) => {
  const objectToSave = new Base({base: body.base})
  return insert(objectToSave);
};
