import Sequelize from 'sequelize';

import User from '../app/models/User';
import Employees from '../app/models/Employees';
import databaseConfig from '../config/database';

const models = [User, Employees];
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
