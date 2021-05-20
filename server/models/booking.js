module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define(
    'Booking',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      user_id: DataTypes.INTEGER,
      showtime_id: DataTypes.INTEGER,
      total: DataTypes.INTEGER,
    },
    {}
  );

  Booking.associate = function (models) {
    Booking.belongsTo(models.User, { foreignKey: 'user_id' });
    Booking.belongsTo(models.Showtime, { foreignKey: 'showtime_id' });
    Booking.hasMany(models.Ticket, { foreignKey: 'booking_id' });
  };

  return Booking;
};
