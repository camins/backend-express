import * as Yup from 'yup';
import SpendingTypes from '../models/SpendingTypes';

class SpendingTypesValidation {
  async isValid(req) {
    const schema = Yup.object().shape({
      descricao: Yup.string().required(),
    });

    return !(await schema.isValid(req.body));
  }

  async hasOne(req) {
    const { descricao } = req.body;
    const type = await SpendingTypes.findOne({ where: { descricao } });

    return type;
  }
}

export default new SpendingTypesValidation();
