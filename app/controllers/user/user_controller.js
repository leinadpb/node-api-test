const UserModel = require('../../models/user');

const show = (req, res) => {
  const io = req.app.get('mysocket');
  io.emit('EVENT', 'Some dataaaa');
  res.status(200).json({ user: req.user });
}

module.exports = {
  show
}