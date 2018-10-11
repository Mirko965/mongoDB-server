const { findByToken } = require('../db/users/findByToken');

const authenticate = async(req,res,next) => {
  try {
    let token = req.header('x-auth')
    const {_id, email} = await findByToken(token)
    const user =  {_id,email}

    req.user = user;
    req.token = token


    console.log(user)
    next()
  } catch (e) {
    res.status(401).send("You don't have permission")
  }
}

module.exports = { authenticate }


