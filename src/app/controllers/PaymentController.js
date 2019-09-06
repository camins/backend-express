import { Op } from 'sequelize';
import { parseISO, endOfDay, startOfDay } from 'date-fns';
import Payment from '../models/Payment';
import Client from '../models/Client';
import PaymentValidation from '../validations/PaymentValidation';

class PaymentController {
  async store(req, res) {
    const isVal = await PaymentValidation.validateInsert(req);
    if (isVal) {
      return res.status(400).json(isVal);
    }

    const { client_id } = req.body;
    const payment = await Payment.findOne({
      where: {
        client_id,
        date: {
          [Op.between]: [
            startOfDay(parseISO(req.body.date)),
            endOfDay(parseISO(req.body.date)),
          ],
        },
      },
    });

    if (payment) {
      payment.value += req.body.value;

      await payment.update({
        value: payment.value,
      });

      return res.json(payment);
    }

    const paymentNew = await Payment.create(req.body);
    return res.json(paymentNew);
  }

  async update(req, res) {
    const isVal = await PaymentValidation.validateUpdate(req);
    if (isVal) {
      return res.status(400).json(isVal);
    }

    const payment = await Payment.findByPk(req.params.id);

    const paymentUpdate = await payment.update(req.body);
    return res.json(paymentUpdate);
  }

  async index(req, res) {
    const { date } = req.query;
    const { page = 1 } = req.query;

    const payment = await Payment.findAll({
      where: {
        date: {
          [Op.between]: [endOfDay(parseISO(date)), endOfDay(new Date())],
        },
      },
      include: [
        {
          model: Client,
          as: 'client',
          attributes: ['name'],
        },
      ],
      limit: 20,
      offset: (page - 1) * 20,
      order: ['date'],
    });

    return res.json(payment);
  }

  async delete(req, res) {
    const payment = await Payment.findByPk(req.params.id);

    const isValid = await PaymentValidation.checkHistory(payment);
    if (isValid) {
      return res.status(400).json(isValid);
    }

    await payment.destroy();
    return res.json({ sucess: 'Item excluído com sucesso' });
  }
}

export default new PaymentController();
