const {MongoClient} = require('mongodb')
const url = 'mongodb://mirko:fionfion00@ds129233.mlab.com:29233/heroku_j5rtxxh3'

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
