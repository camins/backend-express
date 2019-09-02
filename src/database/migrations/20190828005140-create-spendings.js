module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('spendings', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      spendType_id: {
        type: Sequelize.INTEGER,
        references: { model: 'spending_types', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      },
      client_id: {
        type: Sequelize.INTEGER,
        references: { model: 'clients', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      value: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('spendings');
  },
};
