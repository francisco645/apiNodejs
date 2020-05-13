module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('services', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      client: {
        allowNull: false,
        type: new DataTypes.STRING(32),
      },
      assignment: {
        allowNull: false,
        type: DataTypes.STRING(500),
      },
      priority: {
        allowNull: false,
        type: DataTypes.STRING(15),
      },
      state: {
        allowNull: false,
        type: DataTypes.STRING(30),
      },
      city: {
        allowNull: false,
        type: DataTypes.STRING(30),
      },
      district: {
        allowNull: false,
        type: DataTypes.STRING(30),
      },
      street: {
        allowNull: false,
        type: DataTypes.STRING(30),
      },
      client_number: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      latitude: {
        allowNull: false, 
        type: DataTypes.DOUBLE,
      },
      longitude: {
        allowNull: false, 
        type: DataTypes.DOUBLE,
      },
      type_service_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      user_id: {
        allowNull: true,
        type: DataTypes.UUID,
      },
      state_service_id: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      organization_id: {
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
    return queryInterface.dropTable('services');
  }
};