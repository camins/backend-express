import * as Yup from 'yup';
import Employees from '../models/Employees';

class EmployeesValidation {
  async validateInsert(req) {
    let ret;

    const schema = Yup.object().shape({
      name: Yup.string().required('Informe o nome'),
      dateBirth: Yup.date().required('Informe a data de nascimento'),
      cpf: Yup.number().required('Informe o CPF'),
      dateEntry: Yup.date().required(
        'Informe a data de entrada do funcionário'
      ),
      dateExit: Yup.date(),
      salary: Yup.number(),
    });

    await schema.validate(req.body, { abortEarly: false }).catch(err => {
      ret = err.errors;
    });

    if (!ret) {
      const { cpf } = req.body;
      const employee = await Employees.findOne({ where: { cpf } });

      if (employee) {
        ret = 'Já existe um usuário com esse cpf';
      }
    }

    return ret;
  }

  async validateUpdate(req) {
    let ret;

    const schema = Yup.object().shape({
      name: Yup.string(),
      dateBirth: Yup.date(),
      dateEntry: Yup.date(),
      dateExit: Yup.date(),
      salary: Yup.number(),
    });

    await schema.validate(req.body, { abortEarly: false }).catch(err => {
      ret = err.errors;
    });

    return ret;
  }
}

export default new EmployeesValidation();
