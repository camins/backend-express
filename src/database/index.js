import Sequelize from 'sequelize';

import User from '../app/models/User';
import Employee from '../app/models/Employee';
import Client from '../app/models/Client';
import ReportHistory from '../app/models/ReportHistory';
import Spending from '../app/models/Spending';
import Spendingtypes from '../app/models/SpendingTypes';
import Payment from '../app/models/Payment';

import databaseConfig from '../config/database';

const models = [
  User,
  Employee,
  Client,
  ReportHistory,
  Spending,
  Spendingtypes,
  Payment,
];
class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
