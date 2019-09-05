import * as Yup from 'yup';
import { Op } from 'sequelize';
import { startOfDay } from 'date-fns';
import ReportHistory from '../models/ReportHistory';
import Payment from '../models/Payment';

class PaymentValidation {
  async validateInsert(req) {
    let ret;

    const schema = Yup.object().shape({
      date: Yup.date().required('Informe a data'),
      value: Yup.number()
        .required('Informe o valor recebido')
        .positive('O valor deve ser positivo'),
      client_id: Yup.number().required(
        'Informe o cliente que efetuou esse pagamento'
      ),
    });

    await schema.validate(req.body, { abortEarly: false }).catch(err => {
      ret = err.errors;
    });

    return ret;
  }

  async validateUpdate(req) {
    let ret;

    const schema = Yup.object().shape({
      date: Yup.date(),
      value: Yup.number().positive('O valor deve ser positivo'),
      client_id: Yup.number(),
    });

    await schema.validate(req.body, { abortEarly: false }).catch(err => {
      ret = err.errors;
    });

    const payment = await Payment.findByPk(req.params.id);
    if (!payment) {
      ret += ['Pagamento não encontrado'];
    }

    if (!ret && payment) {
      ret = this.checkHistory(payment);
    }

    return ret;
  }

  async checkHistory(payment) {
    let ret;
    const history = await ReportHistory.findOne({
      where: {
        date: {
          [Op.gte]: startOfDay(payment.date),
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

export default new PaymentValidation();
