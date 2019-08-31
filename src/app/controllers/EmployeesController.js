import Employees from '../models/Employees';
import EmployeesValidation from '../validations/EmployeesValidation';

class EmployeesController {
  async store(req, res) {
    const isVal = await EmployeesValidation.validateInsert(req);
    if (isVal) {
      return res.status(400).json(isVal);
    }

    const { cpf } = req.body;
    const employee = await Employees.findOne({ where: { cpf } });

    if (employee) {
      return res
        .status(401)
        .json({ error: 'Já existe um usuário com esse cpf' });
    }

    const {
      id,
      name,
      dateBirth,
      salary,
      dateEntry,
      dateExit,
    } = await Employees.create(req.body);

    return res.json({
      id,
      name,
      dateBirth,
      cpf,
      salary,
      dateEntry,
      dateExit,
    });
  }

  async update(req, res) {
    const isVal = await EmployeesValidation.validateUpdate(req);
    if (isVal) {
      return res.status(400).json(isVal);
    }

    const employee = await Employees.findByPk(req.params.id);

    console.log(req.params.id);

    if (!employee) {
      return res.status(400).json('Funcionário não encontrado');
    }

    const {
      id,
      name,
      dateBirth,
      cpf,
      dateEntry,
      dateExit,
      salary,
    } = await employee.update(req.body);

    return res.json({
      id,
      name,
      dateBirth,
      cpf,
      salary,
      dateEntry,
      dateExit,
    });
  }

  async index(req, res) {
    const { page = 1 } = req.query;

    const employee = await Employees.findAll({
      limit: 20,
      offset: (page - 1) * 20,
      order: ['name'],
    });

    return res.json(employee);
  }

  async delete(req, res) {
    const employee = await Employees.findByPk(req.params.id);

    if (!employee) {
      return res.status(400).json({
        error: 'Funcionário não encontrado',
      });
    }

    await employee.destroy();

    return res.json({ sucess: 'Item excluído com sucesso' });
  }
}

export default new EmployeesController();
