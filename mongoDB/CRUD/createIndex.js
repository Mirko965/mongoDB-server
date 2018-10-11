const {MongoClient} = require('mongodb')
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017';

const createIndex = async (dbName,collName,index = {},options = {}) => {
  const client = await MongoClient.connect(url,{ useNewUrlParser: true })
  const db = await client.db(dbName)

  try {
    const indexes = await db.collection(collName).createIndex(index, options)
    console.log(`Create index: ${indexes}`)
  } catch (e) {
    return e.errmsg
  } finally {
    await client.close()
  }
}

module.exports = {createIndex}
