const {MongoClient,ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');
require('../../config/config.js')
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = 'heroku_nbjlslx4';
const collection = 'user'


async function findByToken (token) {
  try {
    const client = await MongoClient.connect(url)
    const db = await client.db(dbName)
    //console.log(`Connect to MongoDB Server`)

    const decoded = await jwt.verify(token, process.env.JWT_SECRET)
    const doc = {
      _id: ObjectID(decoded._id),
      'tokens.token': token,
      'tokens.access': 'auth'
    }
    const findUserByToken = await db.collection('user').findOne(doc)
    client.close()

    return findUserByToken
  } catch (e) {
    return e.errmsg
  }
}

module.exports = {findByToken}


