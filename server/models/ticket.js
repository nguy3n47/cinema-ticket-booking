module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define(
    'Ticket',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      booking_id: DataTypes.UUID,
      seat_code: DataTypes.STRING,
      price: DataTypes.INTEGER,
    },
    {
      timestamps: false,
    }
  );

  Ticket.associate = function (models) {
    Ticket.belongsTo(models.Booking, { foreignKey: 'booking_id' });
  };

  return Ticket;
};
