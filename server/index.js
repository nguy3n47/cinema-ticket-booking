require('dotenv').config();

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import expressValidator from 'express-validator';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import swaggerUi from 'swagger-ui-express';
import multer from 'multer';
const swaggerJsdoc = require('swagger-jsdoc');

// Model
import models from './models';
// Route
import route from './routers';

const app = express();

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'CGV Cinemas API',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://127.0.0.1:5000',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routers/*.js'],
};
const swaggerSpecs = swaggerJsdoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(multer().array());
app.use(expressValidator());
app.use(cookieParser());
app.use(cors());

// Session
app.use(
  cookieSession({
    name: 'session',
    keys: [process.env.COOKIE_KEY || 'secret'],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

app.use(express.static('public'));

// Route
app.use('/api', route);
app.get('/', (req, res) => {
  res.status(200).json({
    information: 'CGV Cinemas API v1.0.0',
  });
});
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
  });
});

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ error: 'Unauthorized', message: err.message });
  }
  if (err.status && err.name) {
    return res.status(err.status).send({
      message: err.message,
    });
  }
  res.status(500).json({
    message: 'Internal server error',
    error: err.message,
  });
  next();
});

const hostname = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 5000;

app.listen(port, async () => {
  try {
    await models.sequelize.sync(/*{ force: true }*/);
    console.log('Database connected!');
    console.log(`🚀 Server running at http://${hostname}:${port}`);
  } catch (error) {
    console.log('Failed to start server!');
    console.log(error);
  }
});
