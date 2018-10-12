const {MongoClient} = require('mongodb')
const url = 'mongodb+srv://fion:fionfion00@cluster0-lvrf1.mongodb.net/test?retryWrites=true'

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
