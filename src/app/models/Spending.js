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
      foreignKey: 'spendType',
      as: 'spendType',
    });
    this.belongsTo(models.Client, {
      foreignKey: 'client',
      as: 'client',
    });
  }
}

export default Spending;
