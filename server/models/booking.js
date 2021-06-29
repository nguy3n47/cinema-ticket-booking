module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define(
    'Booking',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      b_number: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      showtime_id: DataTypes.INTEGER,
      total: DataTypes.INTEGER,
    },
    {}
  );

  Booking.associate = function (models) {
    Booking.belongsTo(models.User, { foreignKey: 'user_id' });
    Booking.belongsTo(models.Showtime, { foreignKey: 'showtime_id' });
    Booking.hasMany(models.Ticket, {
      foreignKey: { name: 'booking_id', allowNull: true },
      onDelete: 'CASCADE',
      hooks: true,
    });
  };

  return Booking;
};
