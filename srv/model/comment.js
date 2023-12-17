const mongodb = require('mongodb');
const getDb = require('../utils/db').getDb;

class Comment {
  constructor(username, postUrl) {
    this._id = new mongodb.ObjectId();
    this.username = username;
    this.postUrl = postUrl;
  }

  static fetch(postUrl) {
    const db = getDb();
    return db
      .collection('comments')
      .find({ 
        postUrl
      })
      .toArray()
      .then(posts => {
        return posts;
      })
      .catch(err => {
        console.log(err);
      });
  }

  add(message) {
    const db = getDb();

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const currentDateStr = `${year}-${month}-${day}`;
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const currentTimeStr = `${hours}:${minutes}`;

    const obj = {
      message,
      date: currentDateStr,
      time: currentTimeStr,
      ...this
    };
    console.log(obj)

    return db
      .collection('comments')
      .insertOne({
        message,
        date: currentDateStr,
        time: currentTimeStr,
        ...this
      });
  }

  static delete(id) {
    const db = getDb();
    return db
      .collection('comments')
      .deleteOne({
        _id: new mongodb.ObjectId(id),
      });
  }
}

module.exports = Comment;
