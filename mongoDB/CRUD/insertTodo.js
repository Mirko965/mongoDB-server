const {MongoClient} = require('mongodb')
const url = 'mongodb://fion:fionfion00@cluster0-shard-00-00-lvrf1.mongodb.net:27017,cluster0-shard-00-01-lvrf1.mongodb.net:27017,cluster0-shard-00-02-lvrf1.mongodb.net:27017?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true'

const insertTodo = async (text,completed = false, createdAt = 123) => {
  const client = await MongoClient.connect(url,{ useNewUrlParser: true })
  const db = await client.db('heroku_j5rtxxh3')
  const doc = {
    text: text.trim(),
    completed,
    createdAt
  }

  try {
    const todo =  await db.collection('todos').insertOne(doc)
    return todo.ops[0]
  } catch (e) {
    return e.errmsg
  }
  finally {
    await client.close()
  }
}
//insertTodo('from mongod').then(doc => console.log(doc))
module.exports = {insertTodo}
