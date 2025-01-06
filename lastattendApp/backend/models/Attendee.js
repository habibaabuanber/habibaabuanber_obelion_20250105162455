const { Model, DataTypes, Sequelize } = require('sequelize');

const sequelize = new Sequelize('lastattend', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql'
});

class Attendee extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
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

Attendee.init(sequelize);

module.exports = Attendee;