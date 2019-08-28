module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('employees', 'dateEntry', {
        type: Sequelize.DATE,
        allowNull: false,
      }),
      queryInterface.addColumn('employees', 'dateExit', {
        type: Sequelize.DATE,
        allowNull: true,
      }),
    ]);
  },

  down: queryInterface => {
    return Promise.all([
      queryInterface.removeColumn('employees', 'dateEntry'),
      queryInterface.removeColumn('employees', 'dateExit'),
    ]);
  },
};
