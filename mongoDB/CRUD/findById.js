const { MongoClient, ObjectID } = require('mongodb')
const url = 'mongodb+srv://fion:fionfion00@cluster0-lvrf1.mongodb.net/test?retryWrites=true'

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
