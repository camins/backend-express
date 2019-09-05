import { isAfter, parseISO } from 'date-fns';
import Client from '../models/Client';
import ClientValidation from '../validations/ClientValidation';
import Payment from '../models/Payment';

class ClientController {
  async store(req, res) {
    const isVal = await ClientValidation.validateInsert(req);
    if (isVal) {
      return res.status(400).json(isVal);
    }
    const { dateEntry, dateExit } = req.body;

    if (dateExit && !isAfter(parseISO(dateExit), parseISO(dateEntry))) {
      return res
        .status(401)
        .json('A data de saída não pode ser anterior a data de chegada');
    }
    const { id, name } = await Client.create(req.body);

    return res.json({ id, name, dateEntry, dateExit });
  }

  async update(req, res) {
    const isVal = await ClientValidation.validateUpdate(req);
    if (isVal) {
      return res.status(400).json(isVal);
    }

    const client = await Client.findByPk(req.params.id);
    const hasDateExit = req.body.dateExit;

    if (hasDateExit && !isAfter(parseISO(hasDateExit), client.dateEntry)) {
      return res
        .status(401)
        .json('A data de saída não pode ser anterior a data de chegada');
    }

    if (!client) {
      return res.status(400).json('Cliente não encontrado');
    }

    const { id, name, dateEntry, dateExit } = await client.update(req.body);

    return res.json({
      id,
      name,
      dateEntry,
      dateExit,
    });
  }

  async index(req, res) {
    const { page = 1 } = req.query;

    const client = await Client.findAll({
      limit: 20,
      offset: (page - 1) * 20,
      order: ['name'],
    });

    return res.json(client);
  }

  async delete(req, res) {
    const client = await Client.findByPk(req.params.id);

    if (!client) {
      return res.status(400).json({
        error: 'Funcionário não encontrado',
      });
    }

    const values = await Payment.findOne({
      where: { client_id: client.id },
    });

    if (values) {
      return res.status(401).json({
        error:
          'O cliente não pode ser excluído pois existem valores recebidos desse cliente',
      });
    }

    await client.destroy();

    return res.json({ sucess: 'Item excluído com sucesso' });
  }
}

export default new ClientController();
