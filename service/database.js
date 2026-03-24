const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('seven');
const userCollection = db.collection('user');
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

async function addFavorite(user, favorite) {
  await userCollection.updateOne({ username: user }, { $push: { favorites: favorite } });
  const updatedUser = await userCollection.findOne({ username: user });
  return updatedUser.favorites;
}

async function getFavorites(user) {
  const userFavs= await userCollection.findOne({ username: user });
  return userFavs ? userFavs.favorites : [];
}

async function deleteFavorite(user, favorite) {
  await userCollection.updateOne({ username: user }, { $pull: { favorites: favorite } });
  const updatedUser = await userCollection.findOne({ username: user });
  return updatedUser ? updatedUser.favorites : [];
}

async function getGames(limit) {
  return gameCollection.find().limit(limit).toArray();
}

async function findGame(name) {
  const result = await gameCollection.find(
    { Name: { $regex: name, $options: 'i' } }).toArray();
  return result;
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
