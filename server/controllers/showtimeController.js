import { Showtime, Movie, Cinema, Cineplex } from '../models';
import moment from 'moment';

const create = async (req, res, next) => {
  try {
    const { movie_id, cinema_id, start_time, price } = req.body;

    const movie = await Movie.findByPk(movie_id);

    const end_time = moment(start_time)
      .add(movie.running_time, 'minutes')
      .format('YYYY-MM-DD HH:mm');

    const newShowtime = await Showtime.create({
      movie_id,
      cinema_id,
      start_time,
      end_time,
      price,
    });

    if (newShowtime) {
      return res.status(200).send({ message: 'Success', newShowtime });
    } else {
      return res.status(400).send({ message: 'Fail' });
    }
  } catch (error) {
    next(error);
  }
};

const getByMovieId = async (req, res, next) => {
  try {
    const { movie_id } = req.body;
    const showtimes = await Showtime.findAll({
      where: { movie_id },
      include: [
        {
          model: Movie,
          attributes: ['title'],
        },
        {
          model: Cinema,
          attributes: ['id', 'name', 'cineplex_id'],
          include: [{ model: Cineplex, attributes: ['id', 'name'] }],
        },
      ],
    });
    if (showtimes) {
      //   let { start_time, end_time } = showtimes;
      //   start_time = moment(start_time).format('HH:mm A');
      //   end_time = moment(end_time).format('HH:mm A');
      return res.status(200).send({ showtimes });
    } else {
      return res.status(400).send({ error: 'Showtimes not found' });
    }
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const showtime = await Showtime.findByPk(id);

    if (showtime) {
      const { movie_id, cinema_id, start_time, price } = req.body;
      const movie = await Movie.findByPk(movie_id);
      const end_time = moment(start_time)
        .add(movie.running_time, 'minutes')
        .format('YYYY-MM-DD HH:mm');
      const parserData = {
        movie_id,
        cinema_id,
        start_time,
        end_time,
        price,
      };
      await showtime.update(parserData);
      return res.status(200).send({ message: 'Updated' });
    } else {
      return res.status(400).send({ error: 'Showtime not found' });
    }
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const showtime = await Showtime.findByPk(id);
    if (showtime) {
      await showtime.destroy();
      return res.status(200).send({ message: 'Deleted' });
    } else {
      return res.status(400).send({ error: 'Cinema not found' });
    }
  } catch (error) {
    next(error);
  }
};

export { create, getByMovieId, update, remove };
