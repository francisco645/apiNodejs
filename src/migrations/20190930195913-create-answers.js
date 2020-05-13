module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('answers', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      service_id: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      report_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      deleted_at: {
        allowNull: true,
        type: DataTypes.DATE,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('answers');
  }
};