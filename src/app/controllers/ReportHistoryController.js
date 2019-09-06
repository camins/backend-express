import * as Yup from 'yup';
import { Op } from 'sequelize';
import { endOfDay } from 'date-fns';
import ReportHistory from '../models/ReportHistory';
import Spending from '../models/Spending';
import Payment from '../models/Payment';

class ReportHistoryController {
  async storeFirst(req, res) {
    const schema = Yup.object().shape({
      date: Yup.string().required('Informe a data'),
      accountValue: Yup.date().required('Informe o valor em conta'),
    });

    await schema.validate(req.body, { abortEarly: false }).catch(err => {
      return res.status(400).json(err.errors);
    });

    const reports = await ReportHistory.findAll();
    if (reports.length !== 0) {
      return res
        .status(400)
        .json(
          'Não é possível armazenar o registro como primeiro, pois já existem registros armazenados'
        );
    }

    const reportStore = await ReportHistory.create(req.body);

    return res.json(reportStore);
  }

  async store(req, res) {
    if (req.body.accountValue) {
      return res
        .status(400)
        .json({ error: 'Não é permitido informar o valor em conta' });
    }

    const reportHistoryLast = await ReportHistory.findOne({
      order: [['createdAt', 'DESC']],
      limit: 1,
    });

    const dateLast = reportHistoryLast.date;

    const spendings = await Spending.sum('value', {
      where: {
        date: {
          [Op.between]: [endOfDay(dateLast), endOfDay(new Date())],
        },
      },
    });

    const payments = await Payment.sum('value', {
      where: {
        date: {
          [Op.between]: [
            endOfDay(reportHistoryLast.date),
            endOfDay(new Date()),
          ],
        },
      },
    });

    const accountValueToday =
      reportHistoryLast.accountValue + payments - spendings;

    const reportHistory = await ReportHistory.create({
      date: new Date(),
      accountValue: accountValueToday,
    });

    return res.json(reportHistory);
  }

  async indexLast(req, res) {
    const history = await ReportHistory.findOne({
      order: [['createdAt', 'DESC']],
      limit: 1,
    });

    return res.json(history);
  }

  async index(req, res) {
    const { page = 1 } = req.query;

    const histories = await ReportHistory.findAll({
      limit: 20,
      offset: (page - 1) * 20,
      order: ['date'],
    });

    return res.json(histories);
  }

  async update(req, res) {
    if (req.body.accountValue) {
      return res
        .status(400)
        .json({ error: 'Não é permitido informar o valor em conta' });
    }
    const history = await Spending.findByPk(req.params.id);
    if (!history) {
      return res.status(400).json({ error: 'Histórico não encontrado' });
    }

    const historyLast = await ReportHistory.findOne({
      order: [['createdAt', 'DESC']],
      limit: 1,
    });

    // eslint-disable-next-line eqeqeq
    if (historyLast.id != req.params.id) {
      return res
        .status(401)
        .json({ error: 'Só é possível alterar o último histórico' });
    }

    const historyPenult = await ReportHistory.findOne({
      where: {
        date: {
          [Op.lt]: historyLast.date,
        },
      },
      order: [['createdAt', 'DESC']],
      limit: 1,
    });

    const spendings = await Spending.sum('value', {
      where: {
        date: {
          [Op.between]: [endOfDay(historyPenult.date), endOfDay(new Date())],
        },
      },
    });

    const payments = await Payment.sum('value', {
      where: {
        date: {
          [Op.between]: [endOfDay(historyPenult.date), endOfDay(new Date())],
        },
      },
    });

    const accountValueToday = historyPenult.accountValue + payments - spendings;

    const historyUpdate = await historyLast.update({
      date: new Date(),
      accountValue: accountValueToday,
    });

    return res.json(historyUpdate);
  }
}

export default new ReportHistoryController();
