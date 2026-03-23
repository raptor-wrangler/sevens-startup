const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('seven');
const userCollection = db.collection('user');
const favCollection = db.collection('favorites');
const gameCollection = db.collection('games');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log(`Connect to database`);
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

async function addUser(user) {
  await userCollection.insertOne(user);
}

function getUser(username) {
  return userCollection.findOne({ username: username });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function updateUser(user) {
  await userCollection.updateOne({ username: user.username }, { $set: user });
}

async function updateUserRemoveAuth(user) {
  await userCollection.updateOne({ username: user.username }, { $unset: { token: 1 } });
}

async function addFavorite(user, favorites) {
  const userFavs = await favCollection.findOne(user);
  if (!userFavs) {
    await favCollection.insertOne({ ...user, favorites: [favorites] });
    return;
  }
  return favCollection.updateOne(user, { $push: { favorites: favorites } });
}

async function getFavorites(user) {
  const userFavs = await favCollection.findOne(user);
  return userFavs ? userFavs.favorites : [];
}

async function deleteFavorite(user, favorite) {
  return favCollection.updateOne({ ...user }, { $pull: { favorites: favorite } });
}

async function getGames(limit) {
  return gameCollection.find().limit(limit).toArray();
}

async function findGame(name) {
  return gameCollection.find(
    { Name: { $regex: name, $options: 'i' } });
}

module.exports = {
  getUser,
  getUserByToken,
  addUser,
  updateUser,
  updateUserRemoveAuth,
  addFavorite,
  getFavorites,
  deleteFavorite,
  getGames,
  findGame,
};
