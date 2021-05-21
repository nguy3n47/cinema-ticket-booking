import express from 'express';
import * as AuthController from '../controllers/authController';
import * as UserController from '../controllers/userController';
import * as MovieController from '../controllers/movieController';
import * as CineplexController from '../controllers/cineplexController';
import * as CinemaController from '../controllers/cinemaController';
import { resetPasswordValidator, userValidator } from '../validator/auth';
import verifyUser from '../middlewares/verifyUser';

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Authentication
 * /api/auth/register:
 *  post:
 *      tags: [Authentication]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          fullname:
 *                              type: string
 *                              default: Vu Cao Nguyen
 *                          birthday:
 *                              type: string
 *                              default: 07/10/2000
 *                          phone_number:
 *                              type: string
 *                              default: 0383188752
 *                          password:
 *                               type: string
 *                               default: 123456
 *                          email:
 *                                type: string
 *                                default: nguyenvux710@gmail.com
 *                          address:
 *                                type: string
 *                                default: 135B Tran Hung Dao, Q1, TP.HCM
 *                          status:
 *                                type: string
 *                                default: UNVERIFIED
 *      responses:
 *          default:
 *              description: This is the default response for it
 */

// Auth Router
router.post('/auth/register', userValidator, AuthController.register);
router.post('/auth/login', AuthController.login);
router.post('/auth/uploadImage', verifyUser, AuthController.uploadImage);
router.post('/auth/verifyEmail', AuthController.verifyEmail);
router.post('/auth/forgotPassword', AuthController.forgotPassword);
router.post('/auth/verifyCodeResetPassword', AuthController.verifyCodeResetPassword);
router.post('/auth/resetPassword', resetPasswordValidator, AuthController.resetPassword);

// User Router
router.get('/user/me', verifyUser, UserController.getProfile);

// Movie Router
router.get('/movies', MovieController.getAll);
router.post('/movies', MovieController.create);
router.get('/movies/:id', MovieController.getById);
router.get('/movies/:state', MovieController.getByState);
router.put('/movies/:id', MovieController.update);
router.delete('/movies/:id', MovieController.remove);

// Cineplex Router
router.get('/cineplexs', CineplexController.getAll);
router.post('/cineplexs', CineplexController.create);
router.get('/cineplexs/:id', CineplexController.getById);
router.put('/cineplexs/:id', CineplexController.update);
router.delete('/cineplexs/:id', CineplexController.remove);

// Cinema Router
router.get('/cinemas', CinemaController.getByCineplex);
router.post('/cinemas', CinemaController.create);
router.get('/cinemas/:id', CinemaController.getById);
router.put('/cinemas/:id', CinemaController.update);
router.delete('/cinemas/:id', CinemaController.remove);

export default router;
