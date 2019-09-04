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
        date,
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
}

export default new SpendingController();
