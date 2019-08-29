import Sequelize, { Model } from 'sequelize';

class ReportHistory extends Model {
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default ReportHistory;
