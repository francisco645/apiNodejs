module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('itemsAnswers', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      item: {
        allowNull: false, 
        type: DataTypes.STRING,
      },
      fieldAnswer_id: {
        allowNull: false,
        type: DataTypes.UUID,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('itemsAnswers');
  }
};