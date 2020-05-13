module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('invalidTokens', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      token: {
        allowNull: false, 
        type: DataTypes.STRING,
      },
      data: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('invalidTokens');
  }
};