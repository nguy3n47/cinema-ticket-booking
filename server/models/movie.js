import SequelizeSlugify from 'sequelize-slugify';
module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define(
    'Movie',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      slug: {
        type: DataTypes.STRING,
        unique: true,
      },
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      director: DataTypes.STRING,
      actor: DataTypes.STRING,
      genre: DataTypes.STRING,
      poster: DataTypes.STRING,
      running_time: DataTypes.INTEGER,
      release_date: DataTypes.DATEONLY,
      state: DataTypes.STRING,
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {}
  );

  SequelizeSlugify.slugifyModel(Movie, {
    source: ['title'],
    suffixSource: ['release_date'],
  });

  Movie.associate = function (models) {
    Movie.hasMany(models.Showtime, { foreignKey: 'movie_id' });
  };

  return Movie;
};
