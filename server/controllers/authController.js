require('dotenv').config();

import jwt from 'jsonwebtoken';
import { User } from '../models';
import { comparePassword, getHashedPassword } from '../utils/password';
import USER_STATUS from '../constants/userStatus';
import MailService from '../services/mail';

const register = async (req, res) => {
  const { fullname, email, phone, password, birthday, address } = req.body;

  const hashedPassword = await getHashedPassword(password);
  try {
    const userExists = await User.findOne({
      where: {
        email,
      },
    });
    if (userExists)
      return res.status(200).send({
        error: 'Email is taken by another account.',
      });

    const newUser = await User.create({
      fullname,
      email,
      password: hashedPassword,
      phone,
      avatar: 'https://i.imgur.com/vUqWoEE.png',
      birthday,
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
      res.status(200).send({ error: 'Verification code has expired' });
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
      return res.status(200).send({
        error: 'Email does not exist',
      });
    }
    const isTruePassword = await comparePassword(password, user.password);
    if (!isTruePassword) {
      return res.status(200).send({
        error: 'Email and password do not match.',
      });
    }

    if (user.status === 'UNVERIFIED') {
      return res.status(200).send({
        error: 'Account is not verified',
      });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    const { id, fullname, address, status, avatar } = user;

    return res.status(200).send({
      accessToken: token,
      user: { id, email, fullname, address, status, avatar },
    });
  } catch (error) {
    return res.status(400).send({
      error: 'Something went wrong!',
    });
  }
};

const logout = async (req, res) => {
  req.session = null;
  return res.status(200).send({ message: 'Successful logout' });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const code = Math.floor(100000 + Math.random() * 900000);
  try {
    const userExists = await User.findOne({ where: { email: email } });

    if (!userExists)
      return res.status(200).send({
        error: 'Email is not exists',
      });

    await MailService.sendMail(userExists.email, 'Forgot Password', 'Code: ' + code.toString());
    req.session.codeVerify = code.toString();
    req.session.email = email;
    return res.status(200).send({ message: 'Success' });
  } catch (error) {
    return res.status(400).send({ error: 'Fail' });
  }
};

const verifyCodeResetPassword = (req, res) => {
  const { code } = req.body;
  const codeVerify = req.session.codeVerify;

  if (code != codeVerify) {
    return res.status(200).send({ error: 'Invalid Code' });
  } else {
    delete req.session.codeVerify;
    return res.status(200).send({ message: 'OK' });
  }
};

const resetPassword = async (req, res) => {
  const email = req.session.email;
  const { password } = req.body;

  try {
    const user = await User.findOne({ where: { email: email } });
    user.password = await getHashedPassword(password);
    await user.save();
    delete req.session.email;
    return res.status(200).send({ message: 'Change password successfully' });
  } catch (error) {
    return res.status(400).send({
      error: 'Something went wrong!',
    });
  }
};

export {
  register,
  login,
  verifyEmail,
  logout,
  forgotPassword,
  verifyCodeResetPassword,
  resetPassword,
};
