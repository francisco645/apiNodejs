module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('fields', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        allowNull: false, 
        type: DataTypes.STRING(100),
      },
      optional: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      type_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      report_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('fields');
  }
};