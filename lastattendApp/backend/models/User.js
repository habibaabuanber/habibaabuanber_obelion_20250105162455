const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('lastattend', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql'
});
const bcrypt = require('bcrypt');

class User extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      familyName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          notEmpty: true
        }
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          is: /^(\+?\d{1,4}|\d{1,4})?\s?\d{10}$/
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      }
    }, {
      sequelize,
      modelName: 'User',
      timestamps: true,  // Enable automatic creation of `createdAt` and `updatedAt`
      createdAt: 'createdAt', // Default name for created timestamp
      updatedAt: 'updatedAt', // Default name for updated timestamp
      hooks: {
        beforeCreate: async (user) => {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      }
    });
  }

  static async validatePassword(plainTextPassword, hashedPassword) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  }
}

module.exports = User;
