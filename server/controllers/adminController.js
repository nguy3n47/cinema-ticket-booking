require('dotenv').config();

import jwt from 'jsonwebtoken';
import { Admin, User } from '../models';
import { comparePassword } from '../utils/password';

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({
      where: {
        email,
      },
    });
    if (!admin) {
      return res.status(200).send({
        error: 'Email does not exist!',
      });
    }
    const isTruePassword = await comparePassword(password, admin.password);
    if (!isTruePassword) {
      return res.status(200).send({
        error: 'Email and password do not match!',
      });
    }

    const token = jwt.sign({ id: admin.id, admin: true }, process.env.JWT_SECRET);
    const { id, fullname, address, status, avatar } = admin;

    return res.status(200).send({
      accessToken: token,
      admin: { id, email, fullname, address, status, avatar },
    });
  } catch (error) {
    return res.status(400).send({
      error: 'Something went wrong!',
    });
  }
};

const getProfile = async (req, res) => {
  const { id } = req.auth;
  try {
    const admin = await Admin.findByPk(id);
    if (admin) {
      return res.status(200).send({ admin });
    } else {
      return res.status(400).send({ message: 'Not Found' });
    }
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

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).send(users);
  } catch (error) {
    return res.status(400).send({
      error: 'Something went wrong!',
    });
  }
};

export { login, logout, getProfile, getUsers };
