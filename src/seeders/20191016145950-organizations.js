'use strict';
const uuid = require('uuid')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('organizations', [{
      id: 'f43a4b11-1995-42f9-b73e-8a7c8ba94a73',
      name: 'Sigeros',
      cnpj: '86307127082132',
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('organizations', null, {});
  }
};
