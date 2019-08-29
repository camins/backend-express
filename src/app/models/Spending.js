import Sequelize, { Model } from 'sequelize';

class Spending extends Model {
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.DATE,
        value: Sequelize.DOUBLE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.SpendingTypes, {
      foreignKey: 'spendType_id',
      as: 'spendType',
    });
    this.belongsTo(models.Client, {
      foreignKey: 'client_id',
      as: 'client',
    });
  }
}

export default Spending;
