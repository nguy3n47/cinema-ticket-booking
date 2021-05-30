require('dotenv').config();

const verifyAdmin = (req, res, next) => {
  const user = req.auth;
  if (!user.admin) {
    return res.status(400).json({
      error: 'Access denied.',
    });
  }
  next();
};

export default verifyAdmin;
