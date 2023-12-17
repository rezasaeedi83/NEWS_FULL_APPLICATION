const { MongoClient } = require('mongodb');

let _db;

const mongoConnect = (callBack) => {
  const mongo = MongoClient;
  mongo.connect('mongodb://localhost:27017')
  .then(client => {
    _db = client.db();
    callBack();
  })
  .catch((error) => {
    console.log(error);
  });
}

const getDb = () => {
  if (_db)
    return _db;

    throw 'No database found';
}

const initDbConditions = () => {
  const db = getDb();
  db.collection('users').createIndex({ username: 1 }, { unique: true });
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
exports.initDbConditions = initDbConditions;
