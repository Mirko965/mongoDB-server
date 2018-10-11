const {MongoClient} = require('mongodb')
const url = 'mongodb://heroku_j5rtxxh3:76a4mtii4t73tu2dq8g1s6ob4b@ds129233.mlab.com:29233/heroku_j5rtxxh3'

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
