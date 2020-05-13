'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('typesServices', [{
      id: 1,
      name: 'manutenção',
      report_id: 1
    },
    {
      id: 2,
      name: 'consultoria',
      report_id: 1
    },
    {
      id: 3,
      name: 'assessoria',
      report_id: 1
    },
    {
      id: 4,
      name: 'curadoria',
      report_id: 1
    },
    {
      id: 5,
      name: 'limpeza',
      report_id: 1
    },
    {
      id: 6,
      name: 'decoração',
      report_id: 1
    },
  ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('typesServices', null, {});
  }
};
