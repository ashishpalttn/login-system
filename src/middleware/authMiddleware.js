// authMiddleware.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;


function authenticateToken(req, res, next) {
    const token = req.cookies.auth_token;
    console.log('Cookies:', req.cookies);
    if (!token) return res.status(403).json({ message: 'Token required' });
  
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ message: 'Invalid token' });
      res.status(200).json({ message: "Token valid", decoded });
    });
}

module.exports = { authenticateToken };




// const token = req.headers['authorization'];
// if (!token) return res.status(401).send('Access Denied');

// jwt.verify(token, SECRET_KEY, (err, user) => {
//     if (err) return res.status(403).send('Invalid Token');
//     req.user = user;
//     next();
// });