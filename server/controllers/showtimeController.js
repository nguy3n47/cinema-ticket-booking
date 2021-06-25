import {
  Showtime,
  Movie,
  Cinema,
  Cineplex,
  CinemaType,
  Booking,
  Ticket,
} from '../models';
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
          include: [
            { model: Cineplex, attributes: ['id', 'name'] },
            { model: CinemaType },
          ],
        },
      ],
    });

    if (moment(showtime.start_time).format() < moment().format()) {
      return res.status(200).send({ error: 'Showtime has expired' });
    }

    if (showtime) {
      return res.status(200).send(showtime);
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
          include: [
            { model: Cineplex, attributes: ['id', 'name'] },
            { model: CinemaType },
          ],
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

export { create, getByMovieId, update, remove, getById, getSeats };
