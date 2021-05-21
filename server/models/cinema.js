module.exports = (sequelize, DataTypes) => {
  const Cinema = sequelize.define(
    'Cinema',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      cineplex_id: DataTypes.INTEGER,
      cinemaType_id: DataTypes.INTEGER,
      vertical_size: DataTypes.INTEGER,
      horizontal_size: DataTypes.INTEGER,
    },
    {
      timestamps: false,
    }
  );

  Cinema.associate = function (models) {
    Cinema.belongsTo(models.Cineplex, { foreignKey: 'cineplex_id' });
    Cinema.belongsTo(models.CinemaType, { foreignKey: 'cinemaType_id' });
    Cinema.hasMany(models.Showtime, {
      foreignKey: { name: 'cinema_id', allowNull: true },
      onDelete: 'CASCADE',
      hooks: true,
    });
  };

  return Cinema;
};
