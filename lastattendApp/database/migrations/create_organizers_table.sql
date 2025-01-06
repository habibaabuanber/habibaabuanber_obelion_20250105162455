const { Model, DataTypes, Sequelize } = require('sequelize');
class Organizer extends Model {
  static init(sequelize) {
    super.init(
      {
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true
          }
        },
        permissions: {
          type: Sequelize.ENUM('read', 'write', 'admin'),
          allowNull: false
        }
      },
      {
        sequelize,
        modelName: 'Organizer',
        timestamps: false,
        tableName: 'organizers'
      }
    );
  }
}
module.exports = Organizer;
