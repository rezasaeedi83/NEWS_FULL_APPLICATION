const mongodb = require('mongodb');
const sha256 = require('sha256');
const { configs } = require('../config');
const getDb = require('../utils/db').getDb;

class User {
  constructor(username, fullname, password) {
    this._id = new mongodb.ObjectId();
    this.username = username;
    this.fullname = fullname;
    this.password = sha256(configs.PASSWORD_HASH_SALT + password);
  }

  save() {
    const db = getDb();
    return db
      .collection('users')
      .insertOne(this);
  }

  static fetchUser = (username, password) => {
    const db = getDb();

    return db
      .collection('users')
      .findOne({
        username,
        password: sha256(configs.PASSWORD_HASH_SALT + password)
      })
      .then(user => user);
  }


  static fetchAll = () => {
    const db = getDb();
    return db
      .collection('users')
      .find()
      .toArray()
      .then(users => {
        return users;
      })
  }

  static fetchByUsername = (username) => {
    const db = getDb();
    return db
      .collection('users')
      .find({ username })
      .next()
      .then(product => {
        console.log(err);
      });
  }
}

module.exports = User;
