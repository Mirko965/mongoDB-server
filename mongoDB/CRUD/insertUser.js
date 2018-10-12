const {MongoClient} = require('mongodb')
const url = 'mongodb://fion:fionfion00@cluster0-shard-00-00-lvrf1.mongodb.net:27017,cluster0-shard-00-01-lvrf1.mongodb.net:27017,cluster0-shard-00-02-lvrf1.mongodb.net:27017?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true'

const insertUser = async (email,password) => {
  const client = await MongoClient.connect(url,{ useNewUrlParser: true })
  const db = await client.db(dbName)
  const doc = {
    email: email.trim(),
    password
  }

  try {
    const user = await db.collection('users').insertOne(doc)
    return user.ops[0]
  } catch (e) {
    if (e.code === 11000) {
      return 'Email already exist'
    }
    return e.errmsg
  }
  finally {
    await client.close()
  }

}

module.exports = {insertUser}
