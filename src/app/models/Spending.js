import Sequelize, { Model } from 'sequelize';

class Spending extends Model {
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.DATE,
        value: Sequelize.DOUBLE,
        comment: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.SpendingTypes, {
      foreignKey: 'type_id',
      as: 'type',
    });
    this.belongsTo(models.Client, {
      foreignKey: 'client_id',
      as: 'client',
    });
  }
}

export default Spending;
