import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import { Movie } from '../models';
import multer from 'multer';

// SET STORAGE
let storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/img/movies/');
  },
  filename(req, file, cb) {
    cb(null, crypto.randomBytes(18).toString('hex') + path.extname(file.originalname));
  },
});

let upload = multer({ storage }).single('poster');

const create = (req, res, next) => {
  try {
    upload(req, res, async (err) => {
      if (err) return res.send({ error: err.message });
      if (!req.file) return res.send({ error: 'Missing movie poster.' });

      req.body.poster = 'http://127.0.0.1:5000/img/movies/' + req.file.filename;

      const {
        title,
        description,
        director,
        actor,
        genre,
        poster,
        running_time,
        release_date,
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
        state,
      });

      if (newMovie) {
        return res.status(200).send({ message: 'Success' });
      } else {
        return res.status(400).send({ message: 'Fail' });
      }
    });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const movies = await Movie.findAll();
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

const getByState = async (req, res, next) => {
  try {
    const { state } = req.params;
    const movie = await Movie.findOne({ where: { state } });
    if (movie) {
      return res.status(200).send({ movie });
    } else {
      return res.status(400).send({ error: 'Movie not found' });
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
        if (err) return res.send({ error: err.message });
        if (req.file) {
          movie.poster = 'http://127.0.0.1:5000/img/movies/' + req.file.filename;
          await movie.save();
        }

        const {
          title,
          description,
          director,
          actor,
          genre,
          running_time,
          release_date,
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
          state,
          active: active === 'true',
        };

        await movie.update(parserData);
        return res.status(200).send({ message: 'Updated' });
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

export { create, getAll, getById, getByState, update, remove };
