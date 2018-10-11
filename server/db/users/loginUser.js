const {MongoClient} = require('mongodb');
const bcrypt = require('bcryptjs');
require('../../config/config.js')
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = 'heroku_nbjlslx4';
const collection = 'user'

async function loginUser (email,password) {
  const client = await MongoClient.connect(url);
  const db = await client.db(dbName);
  let doc = {email:email}

  const loginUser = await db.collection(collection).findOne(doc)
  const hash = await loginUser.password
  //console.log("hash: ",hash)
  const pass = await bcrypt.compare(password,hash)
  //console.log(pass)


    if (pass === true) {
      console.log(`Login: ${loginUser.email}`)
      client.close()
      return loginUser
    }


}

module.exports = {loginUser}


