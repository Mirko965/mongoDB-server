const { MongoClient, ObjectID } = require('mongodb')
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017';

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
