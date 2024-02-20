import jwt from 'jsonwebtoken';

const e_auth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Need JWT to authorize' });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failure to recognize token' });
    }
    const userIdFromToken = decoded.id;
    // if (userIdFromToken !== req.params.id) {
    //   // If they don't match, return 403 Forbidden
    //   return res.status(403).json({ message: 'Unable to Authorize' });
    // }
    next();
  });
};

export default e_auth;

