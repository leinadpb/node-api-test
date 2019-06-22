const User = require('../../models/user');
const jwt = require('jsonwebtoken');

const signUp = (req, res) => {
  const user = new User({ email: req.body.email, password: req.body.password, first: req.body.first });
  user.save((err) => {
    console.log(err);
    if (err) {
      return res.status(500).json({message: 'Couldn\'t save the specified user'});
    }
    return res.status(200).json({
      user: User.findOne({ email: req.body.email }).exec()
    });
  });
}

const signIn = (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch) {
        const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET);
        res.set('Authorization', token);
        res.status(200).json({
          userId: user.id,
          username: user.username,
          image: user.image,
          name: user.first,
        })
      } else {
        res.status(400).json({message:'Invalid Password/Username'});
      }
    });
  });
}

module.exports = {
  signUp, signIn
}