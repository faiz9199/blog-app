const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET, // Ensure you have this environment variable set
    { expiresIn: '4h' } // Token expiration time
  );
};

module.exports = generateToken;
