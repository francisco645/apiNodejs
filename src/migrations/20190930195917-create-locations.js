module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('locations', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      latitude: {
        allowNull: false, 
        type: DataTypes.DOUBLE,
      },
      longitude: {
        allowNull: false, 
        type: DataTypes.DOUBLE,
      },
      service_id: {
        allowNull: false,
        type: DataTypes.UUID,
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
    return queryInterface.dropTable('locations');
  }
};