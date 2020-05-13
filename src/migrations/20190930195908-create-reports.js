module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('reports', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('reports');
  }
};