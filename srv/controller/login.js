require('dotenv').config();
const jwt = require('jsonwebtoken');
const { configs } = require('../config');
const User = require('../model/user');

exports.doLogin = async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.fetchUser(username, password);
  if (user) {
    const token = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      data: username
    }, configs.JWT_KEY);

    return res.status(200).json({
      message: 'Login Successful',
      isSuccessful: true,
      token,
      name: user.fullname
    });
  }
  
  return res.status(401).json({ message: 'Wrong username or password', isSuccessful: false })
}
