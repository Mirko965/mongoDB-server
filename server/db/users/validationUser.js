const { MongoClient } = require('mongodb')
require('../../config/config.js')
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/?compressors=zlib&zlibcompressionLevel=8';
const dbName = 'heroku_nbjlslx4';
const {user} = require('../../model/user');
const collection = 'user'

async function validationUser () {

  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    console.log('Connect to mongoDB server');

    let create = await db.createCollection('user',user);
    console.log('Create collection: ',create.s.name)

    const index = await db.command({
      createIndexes:`${create.s.name}`,
      indexes: [
        {key:{email:1}, name:"email",unique:true},

      ]
    })
    console.log('Create index:', index)
    const indexes = await db.command({listIndexes: collection})
    console.log('indexes:',JSON.stringify(indexes.cursor.firstBatch.map((item) => item.name)))

    const findCollections = await db.command({listCollections:dbName});
    const collectionsName = await findCollections.cursor.firstBatch.map((name) => name.name);
    console.log('Collections: ',collectionsName)

    client.close()
    return create

  } catch (e) {
    return e.errmsg
  }
}

async function dropCollectionUser () {
  try {
    const client = await MongoClient.connect(url)
    const db = await client.db(dbName)
    //console.log('Connect to mongoDB server');

    const dropColl = await db.command({drop: collection})
    console.log('DROP: ', dropColl)
    return dropColl
  } catch (e) {
    return e.message='Collection not found'
  }
}

module.exports = {validationUser, dropCollectionUser}



