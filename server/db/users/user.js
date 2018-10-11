const {MongoClient} = require('mongodb');
require('../../config/config.js')
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = 'heroku_nbjlslx4';
const collection = 'user'

async function findUser () {
  try {
    const client = await MongoClient.connect(url)
    const db = await client.db(dbName)

    const findUser = await db.collection(collection).find().toArray()
    //console.log('FIND USER:',JSON.stringify(findUser,null,2))

    client.close()
    return findUser
  } catch (e) {
    return e.errmsg
  }
}

module.exports = {findUser}

