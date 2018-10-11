const {MongoClient} = require('mongodb')
const url = 'mongodb://mirko:fionfion00@ds129233.mlab.com:29233/heroku_j5rtxxh3'

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
