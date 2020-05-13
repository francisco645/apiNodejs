'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('types', [{
      id: 1,
      name: 'input',
    },
    {
      id: 2,
      name: 'photograph',
    },], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('types', null, {});
  }
};
