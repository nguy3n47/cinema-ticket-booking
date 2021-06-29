require('dotenv').config();

import express from 'express';
import cors from 'cors';
import expressValidator from 'express-validator';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import swaggerUi from 'swagger-ui-express';
const swaggerJsdoc = require('swagger-jsdoc');

// Model
import models from './models';
// Route
import routes from './routes';

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
app.use(
  cors({
    origin: [
      'https://cgv-cinemas-web.herokuapp.com',
      'https://admin-cgv-cinemas.herokuapp.com',
      'http://localhost:3000',
    ],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(expressValidator());
app.use(cookieParser());

// Session
app.enable('trust proxy');
app.use(
  session({
    secret: 'street',
    resave: true,
    saveUninitialized: true,
    proxy: true,
    cookie: {
      sameSite: 'none',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

app.use(express.static('public'));

// Route
app.use('/api', routes);
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
    return res
      .status(401)
      .json({ error: 'Unauthorized', message: err.message });
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
    await models.sequelize.sync({ alter: true });
    console.log('Database connected!');
    console.log(`🚀 Server running at http://${hostname}:${port}`);
  } catch (error) {
    console.log('Failed to start server!');
    console.log(error);
  }
});
