import {
  Showtime,
  Movie,
  Cinema,
  Cineplex,
  CinemaType,
  Booking,
  Ticket,
  sequelize,
} from '../models';
import _ from 'lodash';
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

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (id.length <= 32) {
      return res.status(200).send({ error: 'Showtime not found' });
    }

    const showtimeId = id.substring(32);

    const showtime = await Showtime.findByPk(showtimeId, {
      include: [
        {
          model: Movie,
        },
        {
          model: Cinema,
          include: [{ model: Cineplex, attributes: ['id', 'name'] }, { model: CinemaType }],
        },
      ],
    });

    if (moment(showtime.start_time).format() < moment().format()) {
      return res.status(200).send({ error: 'Showtime has expired' });
    }

    if (showtime) {
      const cinema = await Cinema.findByPk(showtime.cinema_id);

      let exist_seats = [];
      const bookings = await Booking.findAll({
        where: { showtime_id: showtime.id },
        include: [
          {
            model: Ticket,
            attributes: ['seat_code'],
          },
        ],
      });

      bookings.forEach((booking) => {
        booking.Tickets.forEach((ticket) => {
          exist_seats.push(ticket.seat_code);
        });
      });

      const { vertical_size, horizontal_size } = cinema;
      const size = vertical_size * horizontal_size;
      const reset_seats = exist_seats.length > 0 ? size - exist_seats.length : size;

      return res.status(200).send({ showtime, reset_seats });
    } else {
      return res.status(200).send({ error: 'Showtime not found' });
    }
  } catch (error) {
    next(error);
  }
};

const getByMovieId = async (req, res, next) => {
  try {
    const { movie_id } = req.query;
    const showtimes = await Showtime.findAll({
      where: { movie_id },
      order: [['start_time', 'DESC']],
      include: [
        {
          model: Movie,
          attributes: ['title'],
        },
        {
          model: Cinema,
          attributes: ['id', 'name', 'cineplex_id'],
          include: [{ model: Cineplex, attributes: ['id', 'name'] }, { model: CinemaType }],
        },
      ],
    });
    if (showtimes) {
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

const getSeats = async (req, res, next) => {
  try {
    const { id } = req.params;

    const showtime = await Showtime.findByPk(id);
    const cinema = await Cinema.findByPk(showtime.cinema_id);

    let array_seat_code = [];
    const bookings = await Booking.findAll({
      where: { showtime_id: showtime.id },
      include: [
        {
          model: Ticket,
          attributes: ['seat_code'],
        },
      ],
    });

    bookings.forEach((booking) => {
      booking.Tickets.forEach((ticket) => {
        array_seat_code.push(ticket.seat_code);
      });
    });

    if (cinema) {
      const { vertical_size, horizontal_size } = cinema;
      let obj = { seats: [] };
      let chr;
      let code;
      let arr = [];
      for (let i = 0; i < vertical_size; i++) {
        for (let j = 1; j <= horizontal_size; j++) {
          chr = String.fromCharCode(65 + i);
          code = chr + j.toString();
          if (array_seat_code.includes(code)) {
            arr.push({ seat: code, isReserved: true });
          } else {
            arr.push({ seat: code, isReserved: false });
          }
        }
        obj.seats.push({ key: chr, array: arr });
        arr = [];
      }
      return res.status(200).send(obj);
    } else {
      return res.status(400).send({ error: 'Cinema not found' });
    }
  } catch (error) {
    next(error);
  }
};

const getByCineplexId = async (req, res, next) => {
  try {
    const { cineplex_id } = req.body;

    let movies = await Movie.findAll({
      order: [
        [sequelize.fn('COUNT', sequelize.col('"Showtimes.Bookings.Tickets"."id"')), 'DESC'],
        ['release_date', 'DESC'],
      ],
      include: [
        {
          model: Showtime,
          include: [
            {
              model: Booking,
              attributes: [],
              include: [{ model: Ticket, attributes: [] }],
            },
            { model: Cinema, where: { cineplex_id }, include: [{ model: CinemaType }] },
          ],
        },
      ],
      attributes: ['id', 'title', 'slug', 'poster'],
      where: { state: 'now-showing', active: true },
      group: [
        '"Movie"."id"',
        '"Showtimes"."id"',
        '"Showtimes.Cinema"."id"',
        '"Showtimes.Cinema.CinemaType"."id"',
      ],
    });

    let result = [];
    for (let i = 0; i < 7; i++) {
      let today = new Date(new Date().getTime() + i * 24 * 60 * 60 * 1000);
      if (i > 0) {
        today = moment(today).format('YYYY-MM-DD');
      }
      let start = moment(today).format();
      let end = moment(start).endOf('day').format();
      movies = movies.filter((movie) => movie.Showtimes.length > 0);

      result.push({ date: moment(start).format('DD/MM/YYYY'), movies: [] });

      movies.forEach((movie, m) => {
        result[i].movies.push({
          id: movie.id,
          title: movie.title,
          slug: movie.slug,
          poster: movie.poster,
          showtimes: [],
        });

        movie.Showtimes.forEach((showtime) => {
          if (
            moment(showtime.start_time).format() >= start &&
            moment(showtime.start_time).format() <= end
          ) {
            const existsType = result[i].movies[m].showtimes.filter(
              (t) => t.type_id === showtime.Cinema.CinemaType.id
            );
            const indexType = result[i].movies[m].showtimes.findIndex(
              (t) => t.type_id === showtime.Cinema.CinemaType.id
            );
            if (existsType.length === 0) {
              result[i].movies[m].showtimes.push({
                type_id: showtime.Cinema.CinemaType.id,
                type_name: showtime.Cinema.CinemaType.name,
                list: [
                  {
                    id: showtime.id,
                    cinema_id: showtime.cinema_id,
                    cinema_name: showtime.Cinema.name,
                    start_time: showtime.start_time,
                  },
                ],
              });
              result[i].movies[m].showtimes.sort(function (a, b) {
                return a.type_id - b.type_id;
              });
            } else {
              result[i].movies[m].showtimes[indexType].list.push({
                id: showtime.id,
                cinema_id: showtime.cinema_id,
                cinema_name: showtime.Cinema.name,
                start_time: showtime.start_time,
              });
              result[i].movies[m].showtimes[indexType].list.sort(function (a, b) {
                return new Date(a.start_time) - new Date(b.start_time);
              });
            }
          }
        });
      });
    }

    result.forEach((r) => {
      _.remove(r.movies, (movie) => {
        return movie.showtimes.length === 0;
      });
    });

    return res.status(200).send(result.filter((r) => r.movies.length > 0));
  } catch (error) {
    next(error);
  }
};

export { create, getByMovieId, update, remove, getById, getSeats, getByCineplexId };
