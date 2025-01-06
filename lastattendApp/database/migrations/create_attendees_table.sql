
const { Model, DataTypes, Sequelize } = require('sequelize');

class Attendee extends Model {
  static init(sequelize) {
    super.init({
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        }
      },
      whatsapp: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isNumeric: true,
          len: [10, 15]
        }
      },
      rsvp: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Pending'
      }
    }, {
      sequelize,
      modelName: 'Attendee',
      tableName: 'attendees',
      timestamps: false
    });
  }
}

module.exports = Attendee;
