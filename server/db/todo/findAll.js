const {MongoClient} = require('mongodb');
require('../../config/config.js')
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = 'heroku_nbjlslx4';

async function findAll (doc) {
  try {
    const client = await MongoClient.connect(url);
    const db = await client.db(dbName);

    const findAll = await db.collection('todo').find(doc).toArray();

    client.close()
    return findAll
  } catch (e) {
    return e.message
  }
}

module.exports = {findAll}
