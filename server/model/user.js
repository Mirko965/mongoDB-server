const user = {
  validator: { $and:
    [
      {$and: [{ email: { $regex: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[A-Za-z]{2,4}'} }, {email:{$exists :true}}]},
      {$and: [{password: { $type:"string" }},{password:{$ne:""}}]}
    ]
  },
  validationAction: "error",
  validationLevel:"strict"
};

module.exports = {user}

