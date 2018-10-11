const {MongoClient,MongoError,ObjectID} = require('mongodb');

require('../../config/config.js')
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = 'heroku_nbjlslx4';
const coll = 'todo'

async function deleteById (todoId,userId) {
  try {
    const client = await MongoClient.connect(url);
    const db = await client.db(dbName);
    console.log(`Connect to ${client.s.url}/${db.s.databaseName}`);

    const deleteById = await db.collection(coll).findOneAndDelete(
      {_id:ObjectID(todoId),createdBy:ObjectID(userId)},{projection:{_id:0,text:1}})
    console.log('Delete by Id',deleteById.value)

    client.close()
    return deleteById
  } catch (e) {
    return e.message
  }

}

module.exports = { deleteById }
