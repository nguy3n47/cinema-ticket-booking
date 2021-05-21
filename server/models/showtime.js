module.exports = (sequelize, DataTypes) => {
  const Showtime = sequelize.define(
    'Showtime',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      movie_id: DataTypes.UUID,
      cinema_id: DataTypes.INTEGER,
      start_time: DataTypes.DATE,
      end_time: DataTypes.DATE,
      price: DataTypes.INTEGER,
    },
    {
      timestamps: false,
    }
  );

  Showtime.associate = function (models) {
    Showtime.belongsTo(models.Movie, { foreignKey: 'movie_id' });
    Showtime.belongsTo(models.Cinema, { foreignKey: 'cinema_id' });
    Showtime.hasMany(models.Booking, {
      foreignKey: { name: 'showtime_id', allowNull: true },
      onDelete: 'CASCADE',
      hooks: true,
    });
  };

  return Showtime;
};
