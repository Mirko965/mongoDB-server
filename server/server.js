const express = require('express');
const bodyParser = require('body-parser');
const aa = require('express-async-await');

require('./config/config.js')
const {authenticate} = require('./middleware/authenticate')
const { validationTodo, dropCollectionTodo } = require('./db/todo/validationTodo');
const { validationUser, dropCollectionUser } = require('./db/users/validationUser')
const { insertTodo } = require('./db/todo/insert');
const { insertUser } = require('./db/users/insertUser');
const { findAll } = require('./db/todo/findAll')
const { findById } = require('./db/todo/findById');
const { deleteById } = require('./db/todo/delete')
const { updateTodo } = require('./db/todo/update')
const { findUser } = require('./db/users/user')
const { loginUser } = require('./db/users/loginUser')
const { deleteToken } = require('./db/users/deleteToken')

let app = aa(express());
const port = process.env.PORT
app.use(bodyParser.json());

app.post('/createTodo', async (req,res,next) => {
  try {
    const deleteColl = await dropCollectionTodo()
    if (deleteColl.ns !== undefined){
      res.send(`Delete collection: ${deleteColl.ns}`)
    } else {
      let insertWithValidation = await validationTodo();
      res.send(`Create collection: ${insertWithValidation.s.name}`)
    }

  } catch (e) {
    res.send(e.message)
    //next(e.message)
  }
})

app.post('/insert',authenticate, async(req, res, next) => {
  const doc = {
    text:req.body.text,
    completed:req.body.completed,
    completedAt:req.body.completedAt,
    createdBy:req.user._id
  }
  const insert = await insertTodo(doc);
  res.send(insert)

});

app.get('/findall', authenticate, async(req,res,next) => {
  const find = await findAll({createdBy:req.user._id})
  res.send(find)
})

app.get('/find/:id',authenticate,async(req,res,next) => {
  let todoId = req.params.id;
  let userId = req.user._id;
console.log(userId)
  const message = 'Id not found or you have not permissions'
  const find = await findById(todoId,userId)
  if (find !== null){
    res.send(find)
  } else {

    console.error(message)
    res.status(404).json({message})
  }
})

app.delete('/delete/:id', authenticate, async(req,res,next) => {
  let todoId = req.params.id;
  let userId = req.user._id;
  const message = 'Todo not found or you have not permissions'

  try {

    const del = await deleteById(todoId,userId)
    if (del.value !== null && del !== undefined){
      res.status(200).send(del.value.text)
    } else {
      res.send(message)
      console.log({message})
    }
  } catch (e){
    res.sendStatus(401)
    console.log(e.errmsg)
  }

})

app.patch('/update/:id',authenticate,async(req,res,next) => {
  const message = 'Todo not found or you have not permissions'
  let todoId = req.params.id;
  let userId = req.user._id;

  const text =  req.body.text
  const completed = req.body.completed
  let completedAt;
  if (completed === true){
    completedAt = new Date()
  } else if (completed === false){
    completedAt = ''
  }
  const body = {text, completed, completedAt}

  const doc = await updateTodo(todoId, userId, body)
  if (doc !== undefined && doc !== null) {
    res.send(await doc)
  } else {
    res.send(message)
    console.log({message})
  }


})

app.post('/createUser', async (req,res,next) => {
  try {
    const deleteColl = await dropCollectionUser()
    if (deleteColl.ns !== undefined){
      res.send(`Delete collection: ${deleteColl.ns}`)
    } else {
      let insertWithValidation = await validationUser();
      res.send(`Create collection: ${insertWithValidation.s.name}`)
    }

  } catch (e) {
    res.send(e.message)
    //next(e.message)
  }
})

app.post('/insertUser', async(req,res,next) => {
  let message='Email already exist'
  const Message = 'Wrong Email or Password'
  let user = {
    email:req.body.email,
    password:req.body.password
  }

  try {
    const insert = await insertUser(user);
    const {email,_id} = await insert
    const token = await insert.tokens[0].token

    res.header('x-auth',token).send({_id,email})
  } catch (e){
    if(e.code === 11000){
      console.log(message)
      res.status(404).send( {message})
    } else if(e.code === 121 ){
      console.log(Message)
      res.status(404).send({Message})
    }
  }
})
app.get('/findUser', async(req,res,next) => {
  const user = await findUser()
  res.send(await user)
})

app.get('/findUser/me',authenticate, async(req,res,next) => {
  res.send(req.user)
})

app.post('/user/login',async(req,res,next) => {
  let email = req.body.email;
  let password = req.body.password
  const message = 'Wrong email or password'


  try {
    const user = await loginUser(email,password)
    const header = await user.tokens[0].token
    res.header({'x-auth':header}).send(await user.email)
  } catch (e) {
    console.error(message)
    res.status(400).json({message})
  }

})

app.delete('/findUser/me/token', authenticate, async (req,res,next) => {
  try {
    await deleteToken(req.user,req.token)
    res.status(200).send('Token is delete')
  } catch (e) {
    res.status(400).send()
  }

})


app.get('/weather', async (req,res,next) => {
  const weather = await getWeather();
  res.send(weather)
})

app.listen(port, () => console.log(`Server listen on port ${port}`))



module.exports = {app};
