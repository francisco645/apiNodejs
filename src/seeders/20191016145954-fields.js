'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('fields', [{
      id: 1,
      title: 'Comentários',
      optional: true,
      type_id: 1,
      report_id: 1
    },
    {
      id: 2,
      title: 'Fotos do serviço',
      optional: false,
      type_id: 2,
      report_id: 1
    },], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('fields', null, {});
  }
};
