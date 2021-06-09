import {
  Movie,
  Cineplex,
  Cinema,
  Showtime,
  Booking,
  Ticket,
  sequelize,
} from '../models';
import { Op } from 'sequelize';
import moment from 'moment';

const getByCineplexs = async (req, res, next) => {
  try {
    const { from, to } = req.query;
    const cineplexs = await Cineplex.findAll({
      attributes: {
        include: [
          [
            sequelize.fn(
              'COUNT',
              sequelize.col('"Cinemas.Showtimes.Bookings.Tickets"."id"')
            ),
            'ticket_number',
          ],
          [
            sequelize.fn(
              'SUM',
              sequelize.col('"Cinemas.Showtimes.Bookings.Tickets"."price"')
            ),
            'revenue',
          ],
        ],
      },
      include: [
        {
          model: Cinema,
          attributes: [],
          rights: true,
          include: [
            {
              model: Showtime,
              attributes: [],
              rights: true,
              include: [
                {
                  model: Booking,
                  attributes: [],
                  rights: true,
                  where: {
                    createdAt: {
                      [Op.between]: [
                        moment(from).format(),
                        moment(to)
                          .add(1, 'day')
                          .subtract(1, 'seconds')
                          .format(),
                      ],
                    },
                  },
                  include: [{ model: Ticket, attributes: [], rights: true }],
                },
              ],
            },
          ],
        },
      ],
      group: ['"Cineplex"."id"'],
    });

    let result = {
      labels: [],
      datasets: [
        {
          label: 'Ticket Number',
          data: [],
          backgroundColor: 'rgb(255, 99, 132)',
        },
        {
          label: 'Revenue',
          data: [],
          backgroundColor: 'rgb(54, 162, 235)',
        },
      ],
    };

    cineplexs.map((cineplex) => {
      result.labels.push(cineplex.name);
      result.datasets[0].data.push(parseInt(cineplex.dataValues.ticket_number));
      cineplex.dataValues.revenue !== null
        ? result.datasets[1].data.push(parseInt(cineplex.dataValues.revenue))
        : result.datasets[1].data.push(0);
    });

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

const getByMovies = async (req, res, next) => {
  try {
    const movies = await Movie.findAll({
      attributes: {
        include: [
          [
            sequelize.fn(
              'COUNT',
              sequelize.col('"Showtimes.Bookings.Tickets"."id"')
            ),
            'ticket_number',
          ],
          [
            sequelize.fn(
              'SUM',
              sequelize.col('"Showtimes.Bookings.Tickets"."price"')
            ),
            'revenue',
          ],
        ],
      },

      include: [
        {
          model: Showtime,
          attributes: [],
          rights: true,
          include: [
            {
              model: Booking,
              attributes: [],
              rights: true,
              include: [{ model: Ticket, attributes: [], rights: true }],
            },
          ],
        },
      ],
      group: ['"Movie"."id"'],
    });

    let result = {
      labels: [],
      datasets: [
        {
          label: 'Ticket Number',
          data: [],
          backgroundColor: 'rgb(255, 99, 132)',
        },
        {
          label: 'Revenue',
          data: [],
          backgroundColor: 'rgb(54, 162, 235)',
        },
      ],
    };

    movies.map((movie) => {
      result.labels.push(movie.title);
      result.datasets[0].data.push(parseInt(movie.dataValues.ticket_number));
      movie.dataValues.revenue !== null
        ? result.datasets[1].data.push(parseInt(movie.dataValues.revenue))
        : result.datasets[1].data.push(0);
    });

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export { getByCineplexs, getByMovies };
