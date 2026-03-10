const uuid = require('uuid');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());
app.use(cookieParser());

const bcrypt = require('bcryptjs');

const users = [];

async function createUser(name, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    username: name,
    password: passwordHash,
  };
  users.push(user);
  return user;
}

function getUser(field, value) {
  if (value) {
    return users.find((user) => user[field] === value);
  }
  return null;
}

// Create a token for the user and send a cookie containing the token
function setAuthCookie(res, user) {
  user.token = uuid.v4();
  res.cookie('token', user.token, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
});
}

function clearAuthCookie(res, user) {
  delete user.token;
  res.clearCookie('token');
}

// Registration endpoint
app.post('/api/auth', async (req, res) => {
  if (await getUser('username', req.body.username)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(req.body.username, req.body.password);
    setAuthCookie(res, user);
    res.send({ username: user.username });
  }
});

//Login endpoint
app.put('/api/auth', async (req, res) => {
  const user = await getUser('username', req.body.username);
  if (user && (await bcrypt.compare(req.body.password, user.password))) {
    setAuthCookie(res, user);
    res.send({ username: user.username });
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// logout
app.delete('/api/auth', async (req, res) => {
  const token = req.cookies['token'];
  const user = await getUser('token', token);
  if (user) {
    clearAuthCookie(res, user);
  }
  res.send({});
});


// getMe
app.get('/api/user/me', async (req, res) => {
  const token = req.cookies['token'];
  const user = await getUser('token', token);
  if (user) {
    res.send({ username: user.username });
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// const cookieParser = require('cookie-parser');
// const bcrypt = require('bcryptjs');
// const express = require('express');
// const uuid = require('uuid');
// const app = express();

// // const authCookieName = 'token';

// // let users = [];
// // let favorites = [];
// // let messages = [];


// app.use(express.json());

// // app.use(cookieParser());

// // app.use(express.static('public'));

// var apiRouter = express.Router();
// app.use(`/api`, apiRouter);

// // CreateAuth a new user
// app.post('/api/auth', async (req, res) => {
//   res.send({ email: 'marta@id.com' });
// });

// // apiRouter.post('/auth/create', async (req, res) => {
// //   if (await findUser('username', req.body.username)) {
// //     res.status(409).send({ msg: 'Existing user' });
// //   } else {
// //     const user = await createUser(req.body.username, req.body.password);

// //     setAuthCookie(res, user.token);
// //     res.send({ username: user.username });
// //   }
// // });

// // // GetAuth login an existing user
// // apiRouter.post('/auth/login', async (req, res) => {
// //   const user = await findUser('username', req.body.username);
// //   if (user) {
// //     if (await bcrypt.compare(req.body.password, user.password)) {
// //       user.token = uuid.v4();
// //       setAuthCookie(res, user.token);
// //       res.send({ email: user.username });
// //       return;
// //     }
// //   }
// //   res.status(401).send({ msg: 'Unauthorized' });
// // });

// // // DeleteAuth logout a user
// // apiRouter.delete('/auth/logout', async (req, res) => {
// //   const user = await findUser('token', req.cookies[authCookieName]);
// //   if (user) {
// //     delete user.token;
// //   }
// //   res.clearCookie(authCookieName);
// //   res.status(204).end();
// // });

// // // Middleware to verify that the user is authorized to call an endpoint
// // const verifyAuth = async (req, res, next) => {
// //   const user = await findUser('token', req.cookies[authCookieName]);
// //   if (user) {
// //     next();
// //   } else {
// //     res.status(401).send({ msg: 'Unauthorized' });
// //   }
// // };

// // // Default error handler
// // app.use(function (err, req, res, next) {
// //   res.status(500).send({ type: err.name, message: err.message });
// // });

// // async function createUser(username, password) {
// //   const passwordHash = await bcrypt.hash(password, 10);

// //   const user = {
// //     username: username,
// //     password: passwordHash,
// //     token: uuid.v4(),
// //   };
// //   users.push(user);

// //   return user;
// // }

// // async function findUser(field, value) {
// //   if (!value) return null;

// //   return users.find((u) => u[field] === value);
// // }

// // // setAuthCookie in the HTTP response
// // function setAuthCookie(res, authToken) {
// //   res.cookie(authCookieName, authToken, {
// //     maxAge: 1000 * 60 * 60 * 24 * 365,
// //     secure: true,
// //     httpOnly: true,
// //     sameSite: 'strict',
// //   });
// // }

const port = process.argv.length > 2 ? process.argv[2] : 4000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
