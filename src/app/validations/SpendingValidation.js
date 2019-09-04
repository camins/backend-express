import * as Yup from 'yup';

class SpendingValidation {
  async validateInsert(req) {
    let ret;

    const schema = Yup.object().shape({
      date: Yup.date().required('Informe o data'),
      value: Yup.number()
        .required('Informe o valor do gasto')
        .positive('O valor deve ser positivo'),
      comment: Yup.string(),
    });

    await schema.validate(req.body, { abortEarly: false }).catch(err => {
      ret = err.errors;
    });

    if (!ret) {
      const { type_id } = req.body;

      if (!type_id) {
        ret = ['Informe um tipo de gasto'];
      }
    }
    return ret;
  }
}

export default new SpendingValidation();
