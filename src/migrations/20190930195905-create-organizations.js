module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('organizations', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      name: {
        allowNull: false,
        type: new DataTypes.STRING(32),
      },
      cnpj:{
        allowNull: false,
        type: DataTypes.STRING(14),
        unique: true,
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
    return queryInterface.dropTable('organizations');
  }
};