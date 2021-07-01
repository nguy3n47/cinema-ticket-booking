import { v4 as uuidv4 } from 'uuid';
import {
  Movie,
  Showtime,
  Booking,
  Ticket,
  Cinema,
  Cineplex,
  CinemaType,
  sequelize,
} from '../models';
import { Op } from 'sequelize';
import moment from 'moment';
import multer from 'multer';
import firebase from '../services/firebase';

let upload = multer({ storage: multer.memoryStorage() }).single('poster');

const create = (req, res, next) => {
  try {
    upload(req, res, async (err) => {
      if (err) return res.send({ error: err.message });
      if (!req.file) {
        res.status(400).send({ error: 'Missing movie poster.' });
        return;
      }

      const blob = firebase.bucket.file(req.file.originalname);

      const blobWriter = blob.createWriteStream({
        metadata: {
          contentType: req.file.mimetype,
        },
      });

      blobWriter.on('error', (err) => next(err));

      blobWriter.on('finish', async () => {
        const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
          firebase.bucket.name
        }/o/${encodeURI(blob.name)}?alt=media`;

        req.body.poster = publicUrl;

        const {
          title,
          description,
          director,
          actor,
          genre,
          poster,
          running_time,
          release_date,
          trailer,
          state,
        } = req.body;

        const newMovie = await Movie.create({
          id: uuidv4(),
          title,
          description,
          director,
          actor,
          genre,
          poster,
          running_time: parseInt(running_time),
          release_date,
          trailer,
          state,
        });

        if (newMovie) {
          res.status(200).send({ message: 'Success' });
        } else {
          res.status(400).send({ message: 'Fail' });
        }
      });

      blobWriter.end(req.file.buffer);
    });
  } catch (error) {
    next(error);
  }
};

const getAllShowtimes = async (req, res, next) => {
  try {
    const showtimes = await Movie.findAll({
      include: [
        {
          model: Showtime,
          include: [
            {
              model: Cinema,
              include: [{ model: Cineplex }, { model: CinemaType }],
            },
          ],
        },
      ],
    });
    if (showtimes) {
      return res.status(200).send(showtimes);
    } else {
      return res.status(400).send({ message: 'Fail' });
    }
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    let movies;
    const { state } = req.query;
    if (state) {
      if (state === 'now-showing') {
        movies = await Movie.findAll({
          order: [
            [sequelize.fn('COUNT', sequelize.col('"Showtimes.Bookings.Tickets"."id"')), 'DESC'],
            ['release_date', 'DESC'],
          ],
          where: { state, active: true },
          include: [
            {
              model: Showtime,
              attributes: [],
              include: [
                {
                  model: Booking,
                  attributes: [],
                  include: [{ model: Ticket, attributes: [] }],
                },
              ],
            },
          ],
          group: ['"Movie"."id"'],
        });
      } else {
        movies = await Movie.findAll({
          where: { state, active: true },
          order: [['release_date', 'ASC']],
        });
      }
    } else {
      movies = await Movie.findAll({ order: [['release_date', 'DESC']] });
    }
    return res.status(200).send({
      movies,
    });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findByPk(id);
    if (movie) {
      return res.status(200).send({ movie });
    } else {
      return res.status(400).send({ error: 'Movie not found' });
    }
  } catch (error) {
    next(error);
  }
};

const getBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const movie = await Movie.findOne({ where: { slug } });
    if (movie) {
      return res.status(200).send(movie);
    } else {
      return res.status(200).send({ error: 'Movie not found' });
    }
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findByPk(id);
    if (movie) {
      upload(req, res, async (err) => {
        const {
          title,
          description,
          director,
          actor,
          genre,
          running_time,
          release_date,
          trailer,
          state,
          active,
        } = req.body;

        const parserData = {
          title,
          description,
          director,
          actor,
          genre,
          running_time: parseInt(running_time),
          release_date,
          trailer,
          state,
          active: active === 'true',
        };
        if (err) return res.status(400).send({ error: err.message });
        if (req.file) {
          const blob = firebase.bucket.file(req.file.originalname);

          const blobWriter = blob.createWriteStream({
            metadata: {
              contentType: req.file.mimetype,
            },
          });

          blobWriter.on('error', (err) => next(err));

          blobWriter.on('finish', async () => {
            const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
              firebase.bucket.name
            }/o/${encodeURI(blob.name)}?alt=media`;

            movie.poster = publicUrl;
            await movie.save();
            await movie.update(parserData);
            return res.status(200).send({ message: 'Updated' });
          });

          blobWriter.end(req.file.buffer);
        } else {
          await movie.update(parserData);
          return res.status(200).send({ message: 'Updated' });
        }
      });
    } else {
      return res.status(400).send({ error: 'Movie not found' });
    }
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findByPk(id);
    if (movie) {
      await movie.destroy();
      return res.status(200).send({ message: 'Deleted' });
    } else {
      return res.status(400).send({ error: 'Movie not found' });
    }
  } catch (error) {
    next(error);
  }
};

const getShowtimesByCineplexs = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { day } = req.query;

    const cineplexs = await Cineplex.findAll({
      order: [
        ['id', 'ASC'],
        [Cinema, Showtime, 'start_time', 'ASC'],
      ],
      include: [
        {
          model: Cinema,
          include: [
            {
              model: Showtime,
              where: {
                movie_id: id,
                start_time: {
                  [Op.between]: [
                    moment(day).format('DD/MM/YYYY') === moment().format('DD/MM/YYYY')
                      ? moment().format()
                      : moment(day).format(),
                    moment(day).add(1, 'day').subtract(1, 'seconds').format(),
                  ],
                },
              },
              include: [{ model: Movie }, { model: Cinema, include: [{ model: CinemaType }] }],
            },
          ],
        },
      ],
    });

    const result = [];

    cineplexs.forEach((cineplex, i) => {
      result.push({ id: cineplex.id, name: cineplex.name, showtimes: [] });
      cineplex.Cinemas.forEach((cinema) => {
        cinema.Showtimes.forEach((showtime) => {
          result[i].showtimes.push(showtime);
        });
      });
    });

    return res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export {
  create,
  getAll,
  getAllShowtimes,
  getById,
  update,
  remove,
  getBySlug,
  getShowtimesByCineplexs,
};
