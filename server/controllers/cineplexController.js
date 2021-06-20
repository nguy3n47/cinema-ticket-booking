require('dotenv').config();
import { Cineplex, Cinema } from '../models';
import multer from 'multer';
import firebase from '../services/firebase';

let upload = multer({ storage: multer.memoryStorage() }).single('image');

const create = (req, res, next) => {
  try {
    upload(req, res, async (err) => {
      if (err) return res.send({ error: err.message });
      if (!req.file) {
        res.status(400).send({ error: 'Missing Cineplex image.' });
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

        req.body.image = publicUrl;

        const { name, address, image, googleMapsUrl } = req.body;

        const newCineplex = await Cineplex.create({
          name,
          address,
          image,
          googleMapsUrl,
        });

        if (newCineplex) {
          return res.status(200).send({ message: 'Success' });
        } else {
          return res.status(400).send({ message: 'Fail' });
        }
      });

      blobWriter.end(req.file.buffer);
    });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const cineplexs = await Cineplex.findAll({
      order: [['id', 'ASC']],
      include: [{ model: Cinema }],
    });
    return res.status(200).send({
      cineplexs,
    });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cineplex = await Cineplex.findByPk(id);
    if (cineplex) {
      return res.status(200).send({ cineplex });
    } else {
      return res.status(400).send({ error: 'Cineplex not found' });
    }
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cineplex = await Cineplex.findByPk(id);
    if (cineplex) {
      upload(req, res, async (err) => {
        if (err) return res.send({ error: err.message });
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

            cineplex.image = publicUrl;
            await cineplex.save();
          });

          blobWriter.end(req.file.buffer);
        }

        const { name, address, googleMapsUrl } = req.body;

        const parserData = {
          name,
          address,
          googleMapsUrl,
        };

        await cineplex.update(parserData);
        return res.status(200).send({ message: 'Updated' });
      });
    } else {
      return res.status(400).send({ error: 'Cineplex not found' });
    }
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cineplex = await Cineplex.findByPk(id);
    if (cineplex) {
      await cineplex.destroy();
      return res.status(200).send({ message: 'Deleted' });
    } else {
      return res.status(400).send({ error: 'Cineplex not found' });
    }
  } catch (error) {
    next(error);
  }
};

export { create, getAll, getById, update, remove };
