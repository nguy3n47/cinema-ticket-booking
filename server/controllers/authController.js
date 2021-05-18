require('dotenv').config();

import path from 'path';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { User } from '../models';
import { comparePassword, getHashedPassword } from '../utils/password';
import multer from 'multer';
import USER_STATUS from '../constants/userStatus';
import MailService from '../services/mail';

// SET STORAGE
var storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/img/users/');
  },
  filename(req, file, cb) {
    cb(
      null,
      crypto.randomBytes(18).toString('hex') + path.extname(file.originalname)
    );
  },
});

var upload = multer({ storage }).fields([{ name: 'avatar', maxCount: 1 }]);

const uploadImage = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.send({ error: err.message });
    if (!req.files.avatar) return res.json({ error: 'Missing avatar image.' });
    req.body.avatar = req.files.avatar;
    return res.status(200).send(req.body.avatar[0]);
  });
};

const register = async (req, res) => {
  const { fullname, birthday, phone, password, email, address } = req.body;

  const hashedPassword = await getHashedPassword(password);
  try {
    const userExists = await User.findOne({
      where: {
        email,
      },
    });
    if (userExists)
      return res.status(403).send({
        error: 'Email is taken by another account.',
      });

    const newUser = await User.create({
      fullname,
      birthday,
      phone,
      password: hashedPassword,
      email,
      address,
      status: USER_STATUS.UNVERIFIED,
    });

    if (newUser) {
      const code = Math.floor(100000 + Math.random() * 900000);
      req.session.code = code.toString();
      req.session.email = newUser.email;

      await MailService.sendMail(
        newUser.email,
        'Verify your email address',
        'Code: ' + code.toString()
      );
      res.status(200).send({ message: 'Success' });
    } else {
      res.status(400).send({ error: 'Fail' });
    }
  } catch (error) {
    return res.status(400).send({ error: 'Fail' });
  }
};

const verifyEmail = async (req, res) => {
  const { code } = req.body;
  const email = req.session.email;

  try {
    if (code == req.session.code) {
      const user = await User.findOne({
        where: {
          email,
        },
      });
      user.status = USER_STATUS.VERIFIED;
      await user.save();

      delete req.session.code;
      delete req.session.email;
      return res.status(200).send({ message: 'Verified' });
    } else {
      res.status(400).send({ error: 'Fail' });
    }
  } catch (error) {
    return res.status(400).send({ error: 'Fail' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(401).send({
        error: 'Email does not exist',
      });
    }
    const isTruePassword = await comparePassword(password, user.password);
    if (!isTruePassword) {
      return res.status(401).send({
        error: 'Email and password do not match.',
      });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    const { id, fullname, address, status } = user;

    return res.send({
      accessToken: token,
      user: { id, email, fullname, address, status },
    });
  } catch (error) {
    return res.status(400).send({
      error: 'Something went wrong!',
    });
  }
};

export { register, login, uploadImage, verifyEmail };
