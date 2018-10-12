const {MongoClient} = require('mongodb')
const url = 'mongodb+srv://fion:fionfion00@cluster0-lvrf1.mongodb.net/test?retryWrites=true'
const schemaTodo = require('../schema/todos')

const createCollection = async (dbName,collectionName, schema = {}) => {
  const client = await MongoClient.connect(url,{ useNewUrlParser: true })
  const db = await client.db(dbName)
  const list = await db.listCollections({},{nameOnly:true}).toArray()
  const collName = await list.map((item) => item.name)

  try {
    if(collName.includes(collectionName)){
      return 'Collection already exist'
    }
    const coll = await db.createCollection(collectionName, schema)
    return `Create collection: ${coll.s.name}`
  } catch (e) {
    return e.errmsg
  }
  finally {
    await client.close()
  }
}

module.exports = {createCollection}
