const UserModel = require('../../models/user');

const show = (req, res) => {
  res.status(200).json({ user: req.user })
}

module.exports = {
  show
}