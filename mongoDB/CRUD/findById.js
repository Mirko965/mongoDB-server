const { MongoClient, ObjectID } = require('mongodb')
const url = 'mongodb://heroku_j5rtxxh3:76a4mtii4t73tu2dq8g1s6ob4b@ds129233.mlab.com:29233/heroku_j5rtxxh3';

const findById = async (dbName,collName,id) => {
  const client = await MongoClient.connect(url,{ useNewUrlParser: true })
  const db = client.db(dbName)


  try {
    await ObjectID.isValid(id)
    const _id = new ObjectID(id)
    return await db.collection(collName).findOne({_id })
  } catch (e) {
     return e.errmsg
  } finally {
    await client.close()
  }
}


module.exports = {findById}
