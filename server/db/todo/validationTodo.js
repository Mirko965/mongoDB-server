const { MongoClient } = require('mongodb')
require('../../config/config.js')
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/?compressors=zlib&zlibcompressionLevel=8';
const dbName = 'heroku_nbjlslx4';
const {todo} = require('../../model/todo');
const coll = 'todo'


async function validationTodo () {

  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    console.log('Connect to mongoDB server');

    let create = await db.createCollection(coll,todo);
    console.log('Create collection: ',create.s.name)

    const findCollections = await db.command({listCollections:dbName});
    const collectionsName = await findCollections.cursor.firstBatch.map((name) => name.name);
    console.log('Collections: ',collectionsName)

    client.close()
    return create

  } catch (err) {
    console.log(err.stack)
  }

}
async function dropCollectionTodo () {
  try {
    const client = await MongoClient.connect(url)
    const db = await client.db(dbName)
    //console.log('Connect to mongoDB server');

    const dropColl = await db.command({drop: coll})
    console.log('DROP: ', dropColl)
    return dropColl
  } catch (e) {
    return e.message='Collection not found'
  }
}
module.exports = { validationTodo,dropCollectionTodo }

