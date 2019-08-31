module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('employees', 'date_entry', {
        type: Sequelize.DATE,
        allowNull: false,
      }),
      queryInterface.addColumn('employees', 'date_exit', {
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
