import { Cinema, Booking, Ticket } from '../models';

const create = async (req, res, next) => {
  try {
    const { name, cineplex_id, cinemaType_id, vertical_size, horizontal_size } = req.body;

    const newCinema = await Cinema.create({
      name,
      cineplex_id,
      cinemaType_id,
      vertical_size,
      horizontal_size,
    });

    if (newCinema) {
      return res.status(200).send({ message: 'Success' });
    } else {
      return res.status(400).send({ message: 'Fail' });
    }
  } catch (error) {
    next(error);
  }
};

const getByCineplexId = async (req, res, next) => {
  try {
    const { cineplex_id } = req.body;
    const cinemas = await Cinema.findAll({ where: { cineplex_id } });
    if (cinemas) {
      return res.status(200).send({ cinemas });
    } else {
      return res.status(400).send({ error: 'Cinema not found' });
    }
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cinema = await Cinema.findByPk(id);
    if (cinema) {
      return res.status(200).send({ cinema });
    } else {
      return res.status(400).send({ error: 'Cinema not found' });
    }
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cinema = await Cinema.findByPk(id);
    if (cinema) {
      const { name, cineplex_id, cinemaType_id, vertical_size, horizontal_size } = req.body;

      const parserData = {
        name,
        cineplex_id,
        cinemaType_id,
        vertical_size,
        horizontal_size,
      };

      await cinema.update(parserData);
      return res.status(200).send({ message: 'Updated' });
    } else {
      return res.status(400).send({ error: 'Cinema not found' });
    }
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cinema = await Cinema.findByPk(id);
    if (cinema) {
      await cinema.destroy();
      return res.status(200).send({ message: 'Deleted' });
    } else {
      return res.status(400).send({ error: 'Cinema not found' });
    }
  } catch (error) {
    next(error);
  }
};

const getSeatsByShowtimeId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { showtime_id } = req.query;

    const cinema = await Cinema.findByPk(id);

    let array_seat_code = [];
    const bookings = await Booking.findAll({
      where: { showtime_id },
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

const getType = async (req, res, next) => {
  try {
    const { id } = req.params;
    let cinema = await Cinema.findByPk(id);
    if (cinema) {
      let type = await cinema.getCinemaType();
      let data = { ...cinema.dataValues };
      data.type = type.name;
      return res.status(200).send({ data });
    } else {
      return res.status(400).send({ error: 'Cinema not found' });
    }
  } catch (error) {
    next(error);
  }
};

export { create, getByCineplexId, getById, update, remove, getSeatsByShowtimeId, getType };
