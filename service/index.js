const cookieParser = require('cookie-parser');
const uuid = require('uuid');
const bcrypt = require('bcryptjs');
const express = require('express');
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

const authCookieName = 'token';
const users = [];
let favorites = [];
const messages = [];

async function createUser(username, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    username: username,
    password: passwordHash,
    token: uuid.v4(),
  };
  users.push(user);
  return user;
}

async function getUser(field, value) {
  if (!value) return null;
  return users.find((u) => u[field] === value);
}

// Create a token for the user and send a cookie containing the token
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
});
}

// Registration endpoint
app.post('/api/auth/create', async (req, res) => {
  if (await getUser('username', req.body.username)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(req.body.username, req.body.password);
    setAuthCookie(res, user.token);
    res.send({ username: user.username });
  }
});

//Login endpoint
app.post('/api/auth/login', async (req, res) => {
  const user = await getUser('username', req.body.username);
    if (user) {
      if (await bcrypt.compare(req.body.password, user.password)) {
        user.token = uuid.v4();
        setAuthCookie(res, user.token);
        res.send({ username: user.username });
        return;
      }
    }
    res.status(401).send({ msg: 'Unauthorized' });
  });

// Logout endpoint
app.delete('/api/auth/logout', async (req, res) => {
  const user = await getUser('token', req.cookies[authCookieName]);
  if (user) {
    delete user.token;
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// Default error handler
app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
});

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
    const user = await getUser('token', req.cookies[authCookieName]);
    if (user) {
        next();
    } else {
        res.status(401).send({ msg: 'Unauthorized' });
    }
};

// Add Favorites
app.post('/api/user/fav', verifyAuth, (req, res) => {
  favorites.push(req.body);
  res.send(favorites);
});

// Get Favorites
app.get('/api/user/fav', verifyAuth, (_req, res) => {
  res.send(favorites);
});

//Delete Favorites
app.delete('/api/user/fav', verifyAuth, (req, res) => {
  favorites = favorites.filter(fav => fav.Name !== req.query.key);
  res.send(favorites);
});

// Send Message
app.post('/api/messages', verifyAuth, (req, res) => {
  messages.push(req.body);
  res.send(messages);
});

// Get messages
app.get('/api/messages', verifyAuth, (_req, res) => {
  res.send(messages);
});

const port = process.argv.length > 2 ? process.argv[2] : 4000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
