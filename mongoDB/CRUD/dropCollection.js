const {MongoClient} = require('mongodb')
const url = 'mongodb+srv://fion:fionfion00@cluster0-lvrf1.mongodb.net/test?retryWrites=true'

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
