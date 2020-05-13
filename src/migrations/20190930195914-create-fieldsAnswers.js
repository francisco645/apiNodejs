module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('fieldsAnswers', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      type_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      answer_id: {
        allowNull: false,
        type: DataTypes.UUID,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('fieldsAnswers');
  }
};