const {MongoClient} = require('mongodb')
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017';

const findAll = async (dbName,collName) => {
  const client = await MongoClient.connect(url,{ useNewUrlParser: true })
  const db = client.db(dbName)

  try {
    return await db.collection(collName).find().toArray()

  } catch (e) {
    return e.errmsg
  } finally {
    await client.close()
  }
}

module.exports = {findAll}
