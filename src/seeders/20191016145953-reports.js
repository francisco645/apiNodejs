'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('reports', [{
      id: 1,
    },], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('reports', null, {});
  }
};
