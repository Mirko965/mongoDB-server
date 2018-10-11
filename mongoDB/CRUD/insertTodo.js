const {MongoClient} = require('mongodb')
const url = 'mongodb://heroku_j5rtxxh3:76a4mtii4t73tu2dq8g1s6ob4b@ds129233.mlab.com:29233/heroku_j5rtxxh3';

const insertTodo = async (text,completed = false, createdAt = 123) => {
  const client = await MongoClient.connect(url,{ useNewUrlParser: true })
  const db = await client.db('todo')
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
