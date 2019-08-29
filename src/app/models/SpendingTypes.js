import Sequelize, { Model } from 'sequelize';

class SpendingTypes extends Model {
  static init(sequelize) {
    super.init(
      {
        descricao: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default SpendingTypes;
