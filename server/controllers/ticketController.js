import { User, Booking, Ticket, Showtime, Movie, Cinema, Cineplex, CinemaType } from '../models';

const getAll = async (req, res, next) => {
  try {
    const tickets = await Ticket.findAll({
      attributes: ['id', 'seat_code', 'price'],
      include: [
        {
          model: Booking,
          attributes: ['total'],
          include: [
            {
              model: Showtime,
              attributes: ['start_time', 'end_time'],
              include: [
                {
                  model: Cinema,
                  attributes: ['name'],
                  include: [
                    { model: Cineplex, attributes: ['name'] },
                    { model: CinemaType, attributes: ['name'] },
                  ],
                },
                {
                  model: Movie,
                  attributes: ['title'],
                },
              ],
            },
            { model: User, attributes: ['fullname', 'avatar'] },
          ],
        },
      ],
    });
    return res.status(200).send(tickets);
  } catch (error) {
    next(error);
  }
};

export { getAll };
