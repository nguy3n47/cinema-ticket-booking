import { Cinema, Cineplex, CinemaType } from '../models';

const getAll = async (req, res, next) => {
  try {
    const cinemas = await Cinema.findAll({
      order: [['id', 'ASC']],
      include: [
        {
          model: Cineplex,
          attributes: ['name'],
        },
        {
          model: CinemaType,
          attributes: ['name'],
        },
      ],
    });
    return res.status(200).send({ cinemas });
  } catch (error) {
    next(error);
  }
};

const getTypes = async (req, res, next) => {
  try {
    const cinemaTypes = await CinemaType.findAll({
      order: [['id', 'ASC']],
    });
    return res.status(200).send(cinemaTypes);
  } catch (error) {
    next(error);
  }
};

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
    const cinemas = await Cinema.findAll({
      where: { cineplex_id },
      include: [
        {
          model: Cineplex,
          attributes: ['name'],
        },
        {
          model: CinemaType,
          attributes: ['name'],
        },
      ],
    });
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

const getTypeByCinemaId = async (req, res, next) => {
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

export { getAll, create, getByCineplexId, getById, update, remove, getTypeByCinemaId, getTypes };
