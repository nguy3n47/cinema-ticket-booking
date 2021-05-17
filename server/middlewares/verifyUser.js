require('dotenv').config();

import expressJwt from 'express-jwt';

const verifyUser = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'auth',
  algorithms: ['HS256'],
});

export default verifyUser;
