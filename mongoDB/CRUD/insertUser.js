const {MongoClient} = require('mongodb')
const url = process.env.MONGODB_URI

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
