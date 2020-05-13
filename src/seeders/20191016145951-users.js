'use strict';
const uuid = require('uuid')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      id: uuid.v4(),
      name: 'Master',
      email: 'master@gmail.com',
      password: '$2a$10$7u4yGhm4cpw6odw6IQJpTuPENF0s3VQPPZk.xO5fnLoHBOcfh2GH6',
      is_active: true,
      role_id: 1,
      organization_id: 'f43a4b11-1995-42f9-b73e-8a7c8ba94a73',
      cpf: '86307127082',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuid.v4(),
      name: 'Operador',
      email: 'operador@gmail.com',
      password: '$2a$10$7u4yGhm4cpw6odw6IQJpTuPENF0s3VQPPZk.xO5fnLoHBOcfh2GH6',
      is_active: false,
      role_id: 2,
      organization_id: 'f43a4b11-1995-42f9-b73e-8a7c8ba94a73',
      cpf: '12345678901',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuid.v4(),
      name: 'Prestador',
      email: 'prestador@gmail.com',
      password: '$2a$10$7u4yGhm4cpw6odw6IQJpTuPENF0s3VQPPZk.xO5fnLoHBOcfh2GH6',
      is_active: false,
      role_id: 3,
      organization_id: 'f43a4b11-1995-42f9-b73e-8a7c8ba94a73',
      cpf: '09876543219',
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('users', null, {});
  }
};
