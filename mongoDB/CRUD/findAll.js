const {MongoClient} = require('mongodb')
const url = 'mongodb://heroku_j5rtxxh3:76a4mtii4t73tu2dq8g1s6ob4b@ds129233.mlab.com:29233/heroku_j5rtxxh3'

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
