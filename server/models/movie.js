import SequelizeSlugify from 'sequelize-slugify';
module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define(
    'Movie',
    {
      slug: {
        type: DataTypes.STRING,
        unique: true,
      },
      movie_id: DataTypes.STRING,
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

  Movie.associate = function () {
    // Associations can be defined here
    //Movie.hasMany(models.Schedule, { foreignKey: "movie_id" });
  };

  return Movie;
};
