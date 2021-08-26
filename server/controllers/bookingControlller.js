import { User, Booking, Ticket, Showtime, Movie, Cinema, CinemaType, Cineplex } from '../models';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import MailService from '../services/mail';

const getByUserId = async (req, res, next) => {
  try {
    const user = req.auth;
    const bookings = await Booking.findAll({
      order: [['createdAt', 'DESC']],
      where: { user_id: user.id },
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
              attributes: ['title', 'poster', 'genre', 'running_time'],
            },
            {
              model: Cinema,
              attributes: ['name'],
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
    const user = req.auth;
    const { showtime_id, seats = [] } = req.body;
    const info = await User.findByPk(parseInt(user.id));
    const showtime = await Showtime.findByPk(parseInt(showtime_id),{
      include: [
        {
          model: Movie,
          attributes: ['title', 'poster', 'genre', 'running_time'],
        },
        {
          model: Cinema,
          attributes: ['name'],
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
        },
      ],
    }
    );
    const total = showtime.price * seats.length;

    const newBooking = await Booking.create({
      id: uuidv4(),
      b_number: Date.now(),
      user_id: user.id,
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

      const barcode = `https://www.barcodesinc.com/generator/image.php?code=${newBooking.b_number}&style=196&type=C128B&width=180&height=60&xres=1&font=16`;
      await MailService.sendMail(
        info.email,
        'ĐẶT VÉ THÀNH CÔNG',
        `<h3>THÔNG TIN VÉ</h3>
      <img src=${barcode} align="middle"/>
      <p>Mã vé: ${newBooking.b_number}</p>
      <p>Tên phim: ${showtime.Movie.title}</p>
      <img style="width: 105px; height: 150px; object-fit: cover;" src=${showtime.Movie.poster} align="middle"/>
      <p>Rạp: ${showtime.Cinema.Cineplex.name}</p>
      <p>Phòng chiếu: ${showtime.Cinema.name}</p>
      <p>Suất chiếu: ${moment(showtime.start_time).format('DD/MM/YYYY') + ' - ' + moment(showtime.start_time).format('HH:mm A')}</p>
      <p>Ghế: ${seats.toString()}</p>
      <p>Giá: ${seats.length + ' X ' + new Intl.NumberFormat('vi-VN', {style: 'currency',currency: 'VND',}).format(showtime.price)}</p>
      <p>Tổng cộng: ${new Intl.NumberFormat('vi-VN', {style: 'currency',currency: 'VND',}).format(newBooking.total)}</p>
      <p>CGV Cinemas Việt Nam</p>`
      );
      return res.status(200).send({ message: 'Success', b_number: newBooking.b_number });
    } else {
      return res.status(400).send({ message: 'Fail' });
    }
  } catch (error) {
    next(error);
  }
};

const getByBookingNumber = async (req, res, next) => {
  try {
    const user = req.auth;
    const { number } = req.params;
    const booking = await Booking.findOne({
      where: { b_number: number, user_id: user.id },
      include: [
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
              attributes: ['title', 'poster', 'genre', 'running_time'],
            },
            {
              model: Cinema,
              attributes: ['name'],
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
            },
          ],
        },
      ],
    });
    if (booking) {
      return res.status(200).send(booking);
    } else {
      return res.status(400).send({ error: 'Booking not found' });
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

export { create, getByUserId, remove, getByBookingNumber };
