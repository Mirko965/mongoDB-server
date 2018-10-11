const {MongoClient,ObjectID} = require('mongodb');
require('../../config/config.js')
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = 'heroku_nbjlslx4';

async function updateTodo (todoId,userId,body) {
  try {

    const client = await MongoClient.connect(url);
    const db = await client.db(dbName);

    //console.log(`Connect to ${client.s.url}/${db.s.databaseName}`);

    const updateTodo = await db.collection('todo').findOneAndUpdate(
      {_id:ObjectID(todoId), createdBy:ObjectID(userId)},{$set:body},{returnOriginal:false});

    client.close()
    return updateTodo.value

  } catch (e) {
    return e.errmsg
  }

}

module.exports = {updateTodo}
