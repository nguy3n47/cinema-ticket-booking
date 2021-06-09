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
          include: [
            {
              model: Showtime,
              attributes: [],
              include: [
                {
                  model: Booking,
                  attributes: [],
                  where:
                    from && to
                      ? {
                          createdAt: {
                            [Op.between]: [
                              moment(from).format(),
                              moment(to)
                                .add(1, 'day')
                                .subtract(1, 'seconds')
                                .format(),
                            ],
                          },
                        }
                      : {},
                  include: [{ model: Ticket, attributes: [] }],
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
          yAxisID: 'A',
          data: [],
          backgroundColor: 'rgb(255, 23, 23)',
        },
        {
          label: 'Revenue',
          yAxisID: 'B',
          data: [],
          backgroundColor: 'rgb(69, 69, 69)',
        },
      ],
    };

    if (cineplexs) {
      cineplexs.map((cineplex) => {
        result.labels.push(cineplex.name);
        result.datasets[0].data.push(
          parseInt(cineplex.dataValues.ticket_number)
        );
        cineplex.dataValues.revenue !== null
          ? result.datasets[1].data.push(parseInt(cineplex.dataValues.revenue))
          : result.datasets[1].data.push(0);
      });
      res.status(200).send(result);
    }
  } catch (error) {
    res.status(500).send({ message: 'Invalid date value!' });
  }
};

const getByMovies = async (req, res, next) => {
  try {
    const { from, to } = req.query;
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
          include: [
            {
              model: Booking,
              attributes: [],
              where:
                from && to
                  ? {
                      createdAt: {
                        [Op.between]: [
                          moment(from).format(),
                          moment(to)
                            .add(1, 'day')
                            .subtract(1, 'seconds')
                            .format(),
                        ],
                      },
                    }
                  : {},
              include: [{ model: Ticket, attributes: [] }],
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
          yAxisID: 'A',
          data: [],
          backgroundColor: 'rgb(255, 23, 23)',
        },
        {
          label: 'Revenue',
          yAxisID: 'B',
          data: [],
          backgroundColor: 'rgb(69, 69, 69)',
        },
      ],
    };

    if (movies) {
      movies.map((movie) => {
        result.labels.push(movie.title);
        result.datasets[0].data.push(parseInt(movie.dataValues.ticket_number));
        movie.dataValues.revenue !== null
          ? result.datasets[1].data.push(parseInt(movie.dataValues.revenue))
          : result.datasets[1].data.push(0);
      });
      res.status(200).send(result);
    }
  } catch (error) {
    res.status(500).send({ message: 'Invalid date value!' });
  }
};

export { getByCineplexs, getByMovies };
