module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fullname: DataTypes.STRING,
      birthday: DataTypes.DATEONLY,
      phone: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      address: DataTypes.STRING,
      avatar: DataTypes.STRING,
      status: DataTypes.STRING,
      resetPasswordToken: DataTypes.STRING,
    },
    {}
  );

  User.associate = function (models) {
    User.hasMany(models.Booking, {
      foreignKey: { name: 'user_id', allowNull: true },
      onDelete: 'CASCADE',
      hooks: true,
    });
  };

  return User;
};
