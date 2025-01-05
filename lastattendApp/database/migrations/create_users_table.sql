const { Model, DataTypes, Sequelize } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        familyName: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
            notEmpty: true,
          },
        },
        phoneNumber: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
            is: /^(\\+?\\d{1,4}|\\d{1,4})?\\s?\\d{10}$/,
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
      },
      {
        sequelize,
        modelName: 'User',
        timestamps: false,
        hooks: {
          beforeCreate: async (user) => {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          },
        },
      }
    );
  }
}

module.exports = User;
