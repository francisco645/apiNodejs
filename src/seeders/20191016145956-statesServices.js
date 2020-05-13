'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('statesServices', [{
      id: 1,
      name: 'em trânsito',
    },
    {
      id: 2,
      name: 'em atendimento',
    },
    {
      id: 3,
      name: 'finalizado',
    },
    {
      id: 4,
      name: 'cancelado',
    },], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('statesServices', null, {});
  }
};
