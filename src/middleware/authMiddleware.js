import authService from '../services/auth.service'

const authenticateJWT = (req, res, next) => {
  const token = req.headers['authorization'];

  if (token) {
    try {
      const user = authService.verifyToken(token);
      req.user = user;
      next();
    } catch (err) {
      res.status(403).json({ message: 'Failed to authenticate token' });
    }
  } else {
    res.status(403).json({ message: 'No token provided' });
  }
};

module.exports = authenticateJWT;
