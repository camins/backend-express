import * as Yup from 'yup';
import { Op } from 'sequelize';
import Client from '../models/Client';

class ClientsValidation {
  async validateInsert(req) {
    let ret;

    const schema = Yup.object().shape({
      name: Yup.string().required('Informe o nome'),
      dateEntry: Yup.date().required('Informe a data de entrada do cliente'),
      dateExit: Yup.date(),
    });

    await schema.validate(req.body, { abortEarly: false }).catch(err => {
      ret = err.errors;
    });

    if (!ret) {
      const { name, dateEntry } = req.body;

      const client = await Client.findOne({
        where: {
          name,
          dateEntry: {
            [Op.lte]: dateEntry,
          },
          dateExit: {
            [Op.or]: {
              [Op.eq]: null,
              [Op.gte]: dateEntry,
            },
          },
        },
      });

      if (client) {
        ret = 'Já existe um cliente ativo com esse nome';
      }
    }

    return ret;
  }

  async validateUpdate(req) {
    let ret;

    const schema = Yup.object().shape({
      name: Yup.string(),
      dateEntry: Yup.date(),
      dateExit: Yup.date(),
    });

    await schema.validate(req.body, { abortEarly: false }).catch(err => {
      ret = err.errors;
    });

    const { name } = req.body;
    if (!ret && name) {
      const client = await Client.findOne({
        where: {
          id: {
            [Op.ne]: req.params.id,
          },
          name,
          dateEntry: {
            [Op.lte]: new Date(),
          },
          dateExit: {
            [Op.or]: {
              [Op.eq]: null,
              [Op.gte]: new Date(),
            },
          },
        },
      });

      if (client) {
        ret = 'Já existe um cliente ativo com esse nome';
      }
    }

    return ret;
  }
}

export default new ClientsValidation();
