module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('users', {
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
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      cpf:{
        allowNull: false,
        type: DataTypes.STRING(11),
        unique: true,
      },
      is_active:{
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      role_id:{
        allowNull: false,
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
    return queryInterface.dropTable('users');
  }
};