module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('organizers', [
      {
        email: 'john.doe@example.com',
        permissions: 'read',
      },
      {
        email: 'jane.smith@example.com',
        permissions: 'write',
      },
      {
        email: 'admin@example.com',
        permissions: 'admin',
      },
    ]),
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('organizers', null, {}),
};
