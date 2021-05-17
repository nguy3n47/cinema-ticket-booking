import bcrypt from 'bcrypt';

const round = 10;

export const getHashedPassword = (password) =>
  new Promise((resolve, reject) => {
    bcrypt.hash(password, round, (err, data) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(data);
      }
    });
  });

export const comparePassword = (rawPassword, hashedPassword) =>
  new Promise((resolve, reject) => {
    bcrypt.compare(rawPassword, hashedPassword, (err, data) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(data);
      }
    });
  });
