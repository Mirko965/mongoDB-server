const {MongoClient} = require('mongodb')
const url = 'mongodb://fion:fionfion00@cluster0-shard-00-00-lvrf1.mongodb.net:27017,cluster0-shard-00-01-lvrf1.mongodb.net:27017,cluster0-shard-00-02-lvrf1.mongodb.net:27017?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true'

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
