const Joi = require('joi');

const schema = Joi.object({ 
  username: Joi.string().required().regex(/^[a-zA-Z0-9_-]{3,16}$/),
  password: Joi.string().required().min(6)
});

exports.validate = (req, res, next) => {
  const { username, password } = req.body;
  const { error } = schema.validate({ username, password });
  if (error) {
    return res.status(400).json({
      error: error.details[0].message
    });
  }

  next();
}