import Sequelize, { Model } from 'sequelize';

class Employees extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        dateBirth: Sequelize.DATE,
        cpf: Sequelize.INTEGER,
        salary: Sequelize.DOUBLE,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Employees;
