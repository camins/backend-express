import { parseISO, endOfDay, startOfDay } from 'date-fns';
import { Op } from 'sequelize';
import Spending from '../models/Spending';
import SpendingValidation from '../validations/SpendingValidation';
import SpendingType from '../models/SpendingTypes';

class SpendingController {
  async store(req, res) {
    const isVal = await SpendingValidation.validateInsert(req);
    if (isVal) {
      return res.status(400).json(isVal);
    }

    const { type_id, date, comment, client_id } = req.body;

    const spendType = await SpendingType.findOne({
      where: { id: type_id },
    });

    if (!spendType) {
      return res.status(400).json({ error: 'Tipo de gasto invalido' });
    }

    const spend = await Spending.findOne({
      where: {
        type_id,
        date: {
          [Op.between]: [startOfDay(parseISO(date)), endOfDay(parseISO(date))],
        },
        comment: {
          [Op.is]: null,
        },
      },
    });

    if (spend && !comment) {
      if ((!spend.client_id && !client_id) || spend.client_id === client_id) {
        spend.value += req.body.value;

        await spend.update({
          value: spend.value,
        });

        return res.json(spend);
      }
    }

    const spendNew = await Spending.create(req.body);
    return res.json(spendNew);
  }

  async update(req, res) {
    const isVal = await SpendingValidation.validateUpdate(req);
    if (isVal) {
      return res.status(400).json(isVal);
    }

    const spending = await Spending.findByPk(req.params.id);

    const spendingUpdate = await spending.update(req.body);
    return res.json(spendingUpdate);
  }

  async index(req, res) {
    const { date } = req.query;
    const { page = 1 } = req.query;

    const spending = await Spending.findAll({
      where: {
        date: {
          [Op.between]: [endOfDay(parseISO(date)), endOfDay(new Date())],
        },
      },
      include: [
        {
          model: SpendingType,
          as: 'type',
          attributes: ['descricao'],
        },
      ],
      limit: 20,
      offset: (page - 1) * 20,
      order: ['date'],
    });

    return res.json(spending);
  }

  async delete(req, res) {
    const spending = await Spending.findByPk(req.params.id);

    const isValid = await SpendingValidation.checkHistory(spending);
    if (isValid) {
      return res.status(400).json(isValid);
    }

    await spending.destroy();

    return res.json({ sucess: 'Item excluído com sucesso' });
  }
}

export default new SpendingController();
