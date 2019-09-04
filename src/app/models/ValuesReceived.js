import Sequelize, { Model } from 'sequelize';

class ValuesReceived extends Model {
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
    this.belongsTo(models.Client, {
      foreignKey: 'client_id',
      as: 'client',
    });
  }
}

export default ValuesReceived;
