const { MongoClient,MongoError } = require('mongodb')
require('../../config/config.js')
const url = process.env.MONGODB_URI ||'mongodb://localhost:27017/?compressors=zlib&zlibcompressionLevel=8';
const dbName = 'heroku_nbjlslx4';

async function insertTodo (doc) {

  const client = await MongoClient.connect(url);
  const db = client.db(dbName);

  const ins = await db.collection('todo').insertOne(doc);
  if(ins.result.ok === 1){
    try {
      console.log('Insert todo: ',ins.ops)

      return ins.ops
    } catch (e){
      return e.errmsg
    }
  }
  client.close()
}

module.exports = {insertTodo}

