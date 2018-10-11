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

// (async () => {
//
//   try {
//     const todo = await findById('test', 'todos', '5bbdc4b71f10a1374c71dc6cw')
//     if (todo) {
//       console.log(todo)
//     } else {
//       console.log('todo not found or Invalid _id')
//     }
//   } catch (e) {
//     if (e.errorLabels && e.errorLabels.includes('TransientTransactionError')) {
//       console.log('Upps')
//     }
//
//   }
// })()



module.exports = {findById}
