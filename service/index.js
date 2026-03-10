const uuid = require('uuid');
const bcrypt = require('bcryptjs');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());

const users = [];

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
    maxAge: 1000 * 60 * 60 * 24 * 365,
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
    return;
  }
    res.status(401).send({ msg: 'Account not found' });
  });

// Logout endpoint  !!!
app.delete('/api/auth', async (req, res) => {
  const token = req.cookies['token'];
  const user = await getUser('token', token);
  if (user) {
    clearAuthCookie(res, user);
  }
  res.status(204).send({});
});

// Get user endpoint
app.get('/api/user/me', async (req, res) => {
  const token = req.cookies['token'];
  const user = await getUser('token', token);
  if (user) {
    res.send({ username: user.username });
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// Default error handler
app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
});

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
        next();
    } else {
        res.status(401).send({ msg: 'Unauthorized' });
    }
};

const port = process.argv.length > 2 ? process.argv[2] : 4000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
