module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('Organizer', [
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
    queryInterface.bulkDelete('Organizer', null, {}),
};
