const {MongoClient} = require('mongodb')
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017';

const dropCollection = async (dbname,collName) => {
  const client = await MongoClient.connect(url,{ useNewUrlParser: true })
  const db = await client.db(dbname)

  try { await db.collection(collName).drop()}
  catch (e) {
    return e.errmsg
  }
  finally {
    await client.close()
  }
}

module.exports = {dropCollection}
