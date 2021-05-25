import { User, Booking, Ticket, Showtime, Movie, Cinema, Cineplex } from '../models';
import { v4 as uuidv4 } from 'uuid';

const getByUserId = async (req, res, next) => {
  try {
    const { user_id } = req.query;
    const bookings = await Booking.findAll({
      where: { user_id },
      include: [
        {
          model: User,
          attributes: ['fullname'],
        },
        {
          model: Ticket,
          attributes: ['id', 'seat_code', 'price'],
        },
        {
          model: Showtime,
          attributes: ['start_time', 'end_time'],
          include: [
            {
              model: Movie,
              attributes: ['title'],
            },
            {
              model: Cinema,
              attributes: ['name'],
              include: [
                {
                  model: Cineplex,
                  attributes: ['name'],
                },
              ],
            },
          ],
        },
      ],
    });
    if (bookings) {
      return res.status(200).send({ bookings });
    } else {
      return res.status(400).send({ error: 'Bookings not found' });
    }
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { user_id, showtime_id, seats = [] } = req.body;

    const showtime = await Showtime.findByPk(parseInt(showtime_id));
    const total = showtime.price * seats.length;

    const newBooking = await Booking.create({
      id: uuidv4(),
      user_id: parseInt(user_id),
      showtime_id: parseInt(showtime_id),
      total,
    });

    if (newBooking) {
      seats.forEach(async (seat) => {
        const newTicket = await Ticket.create({
          id: uuidv4(),
          seat_code: seat,
          price: showtime.price,
        });
        await newBooking.addTicket(newTicket);
      });
      return res.status(200).send({ message: 'Success' });
    } else {
      return res.status(400).send({ message: 'Fail' });
    }
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByPk(id);
    if (booking) {
      await booking.destroy();
      return res.status(200).send({ message: 'Deleted' });
    } else {
      return res.status(400).send({ error: 'Booking not found' });
    }
  } catch (error) {
    next(error);
  }
};

export { create, getByUserId, remove };
