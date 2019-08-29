import * as Yup from 'yup';
import SpendingTypes from '../models/SpendingTypes';

class SpendingTypesController {
  async store(req, res) {
    const schema = Yup.object().shape({
      descricao: Yup.string().required(),
    });

    console.log('teste1');
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Erro na Validação' });
    }

    console.log(req.body);
    const { descricao } = req.body;
    console.log(descricao);
    const type = await SpendingTypes.findOne({ where: { descricao } });
    console.log('teste4');
    if (type) {
      return res
        .status(401)
        .json({ error: 'Já existe um tipo de gasto com essa descrição' });
    }
    console.log('teste5');
    const { id, desc } = await SpendingTypes.create(req.body);
    return res.json({
      types: {
        id,
        desc,
      },
    });
  }
}

export default new SpendingTypesController();
