module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('statesServices', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: new DataTypes.STRING(32),
      }
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('statesServices');
  }
};