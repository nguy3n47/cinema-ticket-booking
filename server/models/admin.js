module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define(
    'Admin',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fullname: DataTypes.STRING,
      phone: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      address: DataTypes.STRING,
      avatar: DataTypes.STRING,
    },
    {}
  );

  Admin.associate = function () {};

  return Admin;
};
