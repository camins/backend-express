import Sequelize, { Model } from 'sequelize';

class Client extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        dateEntry: Sequelize.DATE,
        dateExit: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Client;
