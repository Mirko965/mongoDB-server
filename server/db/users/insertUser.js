const { MongoClient,ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('../../config/config.js')
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = 'heroku_nbjlslx4';
const collection = 'user'

async function insertUser (doc) {
  const client = await MongoClient.connect(url)
  const db = client.db(dbName)
  console.log(`Connect to MongoDB Server`)

  const insertUser = await db.collection(collection).insertOne(doc);
  const password = insertUser.ops[0].password;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  try {
    const id = await insertUser.insertedId;
    const access = 'auth'
    const token = await jwt.sign({_id: ObjectID(id).toHexString(), access}, process.env.JWT_SECRET).toString()

    const pushTokenToUser = await db.collection(collection).findOneAndUpdate(
      {_id:ObjectID(id)},
      {$push: {tokens:{_id:new ObjectID,access:access,token:token}},
       $set:{password:hash}
      },
      { returnOriginal: false}
      );

    client.close()
    return pushTokenToUser.value
  } catch (e) {
    return e.errmsg
  }
}

module.exports = { insertUser }

