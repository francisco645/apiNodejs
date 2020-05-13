module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('typesServices', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: new DataTypes.STRING(32),
      },
      report_id: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('typesServices');
  }
};