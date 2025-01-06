module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('User', [
    {
      firstName: 'John',
      familyName: 'Doe',
      email: 'johndoe@example.com',
      phoneNumber: '+1234567890',
      password: 'hashedPassword1'
    },
    {
      firstName: 'Jane',
      familyName: 'Smith',
      email: 'janesmith@example.com',
      phoneNumber: '+0987654321',
      password: 'hashedPassword2'
    }
  ]),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('User', null, {})
};
