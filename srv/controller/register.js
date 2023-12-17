const jwt = require('jsonwebtoken');
const { configs } = require('../config');
const User = require('../model/user');

exports.doRegister = (req, res, next) => {
  const { username, fullname, password } = req.body;
  const user = new User(username, fullname, password);
  user
    .save()
    .then(result => {
      const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: username
      }, configs.JWT_KEY);
      return res.status(200).json({ isSuccessfull: true, token });
    })
    .catch(err => {
      if (err.keyPattern.username) {
        return res.status(500).json({ isSuccessfull: false, message: 'This username has been used before' });
      }

      return res.status(500).json({ isSuccessfull: false, message: 'an error occured' });
    })
}
