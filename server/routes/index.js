import express from 'express';
import * as AuthController from '../controllers/authController';
import * as UserController from '../controllers/userController';
import * as MovieController from '../controllers/movieController';
import * as CineplexController from '../controllers/cineplexController';
import * as CinemaController from '../controllers/cinemaController';
import * as ShowtimeController from '../controllers/showtimeController';
import * as BookingController from '../controllers/bookingControlller';
import * as TicketController from '../controllers/ticketController';
import * as AdminController from '../controllers/adminController';
import * as StatisticController from '../controllers/statisticController';
import { resetPasswordValidator, userValidator } from '../validations/auth';
import verifyUser from '../middlewares/verifyUser';
import isAdmin from '../middlewares/verifyAdmin';

const router = express.Router();

// Auth Router
router.post('/auth/register', userValidator, AuthController.register);
router.post('/auth/login', AuthController.login);
router.post('/auth/verifyEmail', AuthController.verifyEmail);
router.post('/auth/forgotPassword', AuthController.forgotPassword);
router.post('/auth/verifyCodeResetPassword', AuthController.verifyCodeResetPassword);
router.post('/auth/resetPassword', resetPasswordValidator, AuthController.resetPassword);

// User Router
router.get('/user/profile', verifyUser, UserController.getProfile);
router.put('/user/profile', verifyUser, UserController.updateProfile);

// Movie Router
router.get('/movies', MovieController.getAll);
router.get('/movies/showtimes', MovieController.getAllShowtimes);
router.get('/movies/:id/showtimes', MovieController.getShowtimesByCineplexs);
router.post('/movies', MovieController.create);
router.get('/movies/:id', MovieController.getById);
router.get('/movies/detail/:slug', MovieController.getBySlug);
router.put('/movies/:id', MovieController.update);
router.delete('/movies/:id', MovieController.remove);

// Cineplex Router
router.get('/cineplexs', CineplexController.getAll);
router.post('/cineplexs', CineplexController.create);
router.get('/cineplexs/:id', CineplexController.getById);
router.put('/cineplexs/:id', CineplexController.update);
router.delete('/cineplexs/:id', CineplexController.remove);

// Cinema Router
router.get('/cinemas', CinemaController.getByCineplexId);
router.get('/cinemas/all', CinemaController.getAll);
router.get('/cinemas/types', CinemaController.getTypes);
router.get('/cinemas/:id/type', CinemaController.getTypeByCinemaId);
router.post('/cinemas', CinemaController.create);
router.get('/cinemas/:id', CinemaController.getById);
router.put('/cinemas/:id', CinemaController.update);
router.delete('/cinemas/:id', CinemaController.remove);

// Showtime Router
router.get('/showtimes', ShowtimeController.getByMovieId);
router.get('/showtimes/:id', ShowtimeController.getById);
router.get('/showtimes/:id/seats', ShowtimeController.getSeats);
router.post('/showtimes', ShowtimeController.create);
router.put('/showtimes/:id', ShowtimeController.update);
router.delete('/showtimes/:id', ShowtimeController.remove);

// Booking Router
router.get('/bookings', verifyUser, BookingController.getByUserId);
router.get('/bookings/:number', verifyUser, BookingController.getByBookingNumber);
router.post('/bookings', verifyUser, BookingController.create);
router.delete('/bookings/:id', BookingController.remove);

// Ticket Router
router.get('/tickets', TicketController.getAll);

// Admin Router
router.get('/admin/profile', verifyUser, isAdmin, AdminController.getProfile);
router.post('/admin/auth/login', AdminController.login);
router.get('/users', AdminController.getUsers);

// Statistic Router
router.get('/statistic/movies', StatisticController.getByMovies);
router.get('/statistic/cineplexs', StatisticController.getByCineplexs);

export default router;
