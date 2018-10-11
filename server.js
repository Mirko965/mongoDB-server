const express = require('express')
const bodyParser= require('body-parser')
const asyncHandler = require('express-async-handler')
const { insertTodo } = require('./mongoDB/CRUD/insertTodo')
const { insertUser } = require('./mongoDB/CRUD/insertUser')
const { findAll } = require('./mongoDB/CRUD/findAll')
const { findById } = require('./mongoDB/CRUD/findById')

const port = process.env.PORT || 3000

const app = express()
app.use(bodyParser.json())

app.post('/todos', asyncHandler(async (req,res) => {
  try {
    const text = req.body.text
    const completed = req.body.completed
    const createdAt = req.body.createdAt
    const todo = await insertTodo(text,completed,createdAt)
    res.send(todo)
  } catch (err) {
    res.status(400).send(`Error: ${err.message}`)
  }

}))
app.get('/todos', asyncHandler(async (req,res) => {
  try {
    const allTodos = await findAll('heroku_j5rtxxh3', 'todos')
    res.send({Todos:allTodos})
  } catch (err) {
    res.status(400).send(`Error: ${err.message}`)
  }
}))
app.get('/todos/:id', asyncHandler(async (req,res) => {
  try {
    const todoId = await req.params.id
    const todo = await findById('heroku_j5rtxxh3', 'todos', todoId)
    if(todo){
      res.send({todo})
    } else {
      res.status(400).send('todo not found or Invalid _id')
    }
  } catch (e) {
    res.status(400).send(JSON.stringify(e))
  }
}))


app.post('/users', (req,res) => {
  const email = req.body.email
  const pass = req.body.password
  const user = insertUser(email,pass)
  user.then((doc) => {
    console.log(doc)
    res.send(doc)
  }, (err) => {
    res.status(400).send(err)
  })
})

app.listen(port,() => {
  console.log(`server listening port ${port}`)
})




