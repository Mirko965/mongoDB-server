const { MongoClient,ObjectID,MongoError } = require('mongodb');
require('../../config/config.js')
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = 'heroku_nbjlslx4';
const coll = 'todo';

async function findById (id,userId) {

  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    //console.log(`Connect to ${client.s.url}/${db.s.databaseName}`);

    const findById = await db.collection(coll).findOne(
      {_id:ObjectID(id),createdBy:ObjectID(userId)});
    console.log('Find by id: ',findById)
    client.close()
    return findById
  } catch (e) {
    return e.message
  }
}

module.exports = {findById}

