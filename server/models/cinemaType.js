module.exports = (sequelize, DataTypes) => {
  const CinemaType = sequelize.define(
    'CinemaType',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
    },
    {
      timestamps: false,
    }
  );

  CinemaType.associate = function (models) {
    CinemaType.hasMany(models.Cinema, {
      foreignKey: { name: 'cinemaType_id', allowNull: true },
      onDelete: 'CASCADE',
      hooks: true,
    });
  };

  return CinemaType;
};
