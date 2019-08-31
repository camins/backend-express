import SpendingTypesValidation from '../validations/SpendingTypesValidation';
import SpendingTypes from '../models/SpendingTypes';
import Spendings from '../models/Spendings';

class SpendingTypesController {
  async store(req, res) {
    if (await SpendingTypesValidation.validate(req)) {
      return res.status(400).json({ error: 'Erro na Validação' });
    }

    if (await SpendingTypesValidation.hasOne(req)) {
      return res
        .status(401)
        .json({ error: 'Já existe um tipo de gasto com essa descrição' });
    }

    const { id, descricao } = await SpendingTypes.create(req.body);
    return res.json({
      id,
      descricao,
    });
  }

  async update(req, res) {
    if (await SpendingTypesValidation.validate(req)) {
      return res.status(400).json({ error: 'Erro na Validação' });
    }

    if (await SpendingTypesValidation.hasOne(req)) {
      return res
        .status(401)
        .json({ error: 'Já existe um tipo de gasto com essa descrição' });
    }

    const spendingType = await SpendingTypes.findByPk(req.params.id);

    const { id, descricao } = await spendingType.update(req.body);

    return res.json({ id, descricao });
  }

  async index(req, res) {
    const { page = 1 } = req.query;

    const spendingTypes = await SpendingTypes.findAll({
      limit: 20,
      offset: (page - 1) * 20,
      attributes: ['id', 'descricao'],
      order: ['descricao'],
    });

    return res.json(spendingTypes);
  }

  async delete(req, res) {
    const spendingType = await SpendingTypes.findByPk(req.params.id);

    if (!spendingType) {
      return res.status(400).json({
        error: 'Tipo de gasto não encontrado',
      });
    }

    const spend = await Spendings.findOne({
      where: { spendType_id: spendingType.id },
    });

    if (spend) {
      return res.status(401).json({
        error:
          'O Tipo de gasto não pode ser excluído pois existem gastos desse tipo',
      });
    }

    await spendingType.destroy();

    return res.json({ sucess: 'Item excluído com sucesso' });
  }
}

export default new SpendingTypesController();
