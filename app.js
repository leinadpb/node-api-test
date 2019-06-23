const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('./app/models/user');
const validate_env_variables = require('./app/helpers/validate_envs');
const socketServer = require('./ws');
const UserRouter = require('./app/routes/user_router');
const AuthRouter = require('./app/routes/auth_router');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
validate_env_variables(process.env);

const db = process.env.CONNECTION_STRING;
mongoose
  .connect(db)
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch(err => {
    console.log(err);
    console.log('MongoDB Not Connected');
  });

const app = express();

app.use(require('body-parser').json());
app.use((req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        return res.status(401).json({message: "Invalid signature. Please log in again or verify your access token."})
      }
      if (!!payload) {
        User.findById(payload.userId).then(doc => {
          req.user = doc;
          next();
        });
      } else {
        next();
      }
    })
  } catch(e) {
    next();
  }
});

app.use('/api/v1/users', UserRouter);
app.use('/api/v1/auth', AuthRouter);

const AppServer = require('http').createServer(app)
const io = socketServer(AppServer);

app.set('mysocket', io);

AppServer.listen(process.env.PORT || "3001" ,()=>{
  const port = process.env.PORT;
  console.log(`App has started: Listening on port ${!!port ? port : 3001}`);
});
