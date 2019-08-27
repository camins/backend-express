import * as Yup from 'yup';
import Employees from '../models/Employees';

class EmployeesController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      dateBirth: Yup.date().required(),
      cpf: Yup.number().required(),
      salary: Yup.number(),
    });
    console.log(req.body);
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Erro na Validação' });
    }

    const { cpf } = req.body;

    const employee = await Employees.findOne({ where: { cpf } });

    if (employee) {
      return res
        .status(401)
        .json({ error: 'Já existe um usuário com esse cpf' });
    }
    const { id, name, dateBirth, active } = await User.create(req.body);
    return res.json({
      employees: {
        id,
        name,
        dateBirth,
        cpf,
        active,
      },
    });
  }
}

export default new EmployeesController();
