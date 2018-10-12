const {MongoClient} = require('mongodb')
const url = 'mongodb://fion:fionfion00@cluster0-shard-00-00-lvrf1.mongodb.net:27017,cluster0-shard-00-01-lvrf1.mongodb.net:27017,cluster0-shard-00-02-lvrf1.mongodb.net:27017?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true'

const removeCollection = async (dbname,collName) => {
  const client = await MongoClient.connect(url,{ useNewUrlParser: true })
  const db = await client.db(dbname)

  try { await db.collection(collName).deleteMany({})}
  catch (e) {
    return e.errmsg
  }
  finally {
    await client.close()
  }
}

module.exports = {removeCollection}
