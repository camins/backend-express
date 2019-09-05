import * as Yup from 'yup';
import { Op } from 'sequelize';
import { startOfDay } from 'date-fns';
import ReportHistory from '../models/ReportHistory';
import Spending from '../models/Spending';

class SpendingValidation {
  async validateInsert(req) {
    let ret;

    const schema = Yup.object().shape({
      date: Yup.date().required('Informe o data'),
      value: Yup.number()
        .required('Informe o valor do gasto')
        .positive('O valor deve ser positivo'),
      comment: Yup.string(),
    });

    await schema.validate(req.body, { abortEarly: false }).catch(err => {
      ret = err.errors;
    });

    if (!ret) {
      const { type_id } = req.body;

      if (!type_id) {
        ret = ['Informe um tipo de gasto'];
      }
    }
    return ret;
  }

  async validateUpdate(req) {
    let ret;

    const schema = Yup.object().shape({
      date: Yup.date(),
      value: Yup.number().positive('O valor deve ser positivo'),
      comment: Yup.string(),
    });

    await schema.validate(req.body, { abortEarly: false }).catch(err => {
      ret = err.errors;
    });

    const spending = await Spending.findByPk(req.params.id);
    if (!spending) {
      ret += ['Gasto não encontrado'];
    }

    if (!ret && spending) {
      ret = this.checkHistory(spending);
    }

    return ret;
  }

  async checkHistory(spending) {
    let ret;
    const history = await ReportHistory.findOne({
      where: {
        date: {
          [Op.gte]: startOfDay(spending.date),
        },
      },
    });

    if (history) {
      ret = [
        'Não é possível alterar/excluir um registro quando a folha do mês já foi fechada',
      ];
    }

    return ret;
  }
}

export default new SpendingValidation();
