'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('roles', [{
      id: 1,
      name: 'master',
    },
    {
      id: 2,
      name: 'operador',
    },
    {
      id: 3,
      name: 'prestador',
    }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('roles', null, {});
  }
};
