import Sequelize from 'sequelize';

import User from '../app/models/User';
import Employees from '../app/models/Employees';
import Client from '../app/models/Client';
import ReportHistory from '../app/models/ReportHistory';
import Spendings from '../app/models/Spendings';
import Spendingtypes from '../app/models/SpendingTypes';
import ValuesReceived from '../app/models/ValuesReceived';

import databaseConfig from '../config/database';

const models = [
  User,
  Employees,
  Client,
  ReportHistory,
  Spendings,
  Spendingtypes,
  ValuesReceived,
];
class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
