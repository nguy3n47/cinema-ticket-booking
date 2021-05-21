import { User } from '../models';

const getProfile = async (req, res) => {
  const { id } = req.auth;
  try {
    const user = await User.findByPk(id);
    if (user) {
      return res.status(200).send({ user });
    } else {
      return res.status(400).send({ message: 'Not Found' });
    }
  } catch (error) {
    return res.status(400).send({
      error: 'Something went wrong!',
    });
  }
};

export { getProfile };
