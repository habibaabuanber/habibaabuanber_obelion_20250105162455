const { Model, DataTypes, Sequelize } = require('sequelize');

const sequelize = new Sequelize('lastattend', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql',
  logging: false,
});

class Organizer extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            isEmail: true,
          },
          unique: true,
        },
        permissions: {
          type: DataTypes.ENUM('read', 'write', 'admin'),
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Organizer',
        timestamps: false,
        tableName: 'organizers',
      }
    );
  }
}

Organizer.init(sequelize);

module.exports = Organizer;