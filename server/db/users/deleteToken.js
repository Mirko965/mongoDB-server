const {MongoClient} = require('mongodb');
require('../../config/config.js')
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = 'heroku_nbjlslx4';
const collection = 'user'

async function deleteToken (user,token) {
  const client = await MongoClient.connect(url);
  const db = await client.db(dbName);

  const query = user;
  const update = {$pull:{tokens:{token: token}}}
  const deleteToken = await db.collection(collection).findOneAndUpdate(query,update,{returnOriginal:false})

  client.close()
  return deleteToken
}

module.exports = { deleteToken }

