module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      fullname: DataTypes.STRING,
      birthday: DataTypes.DATEONLY,
      phone_number: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      address: DataTypes.STRING,
      avatar: DataTypes.STRING,
      status: DataTypes.STRING,
      resetPasswordToken: DataTypes.STRING,
    },
    {}
  );

  User.associate = function () {
    // Associations can be defined here
  };

  return User;
};
