import jwt from 'jsonwebtoken'
const SECRET_KEY = 'your_secret_key';

class authService{
    constructor() {
        
    }


 generateToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    role: user.role
  };
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
};

 verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    throw new Error('Invalid token');
  }
};
}
export default authService
