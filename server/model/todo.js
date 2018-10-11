const todo = {
  validator: {$and: [
    { text: { $type: "string" ,$exists:true, $ne:""} },
      {$or:
      [
        { completed: { $type:"bool" }},
        { $or:[{completedAt:{$type:"string"}},{completedAt:{$type:"date"}}] },
        { createdBy: { $type: "string" } },
      ]}]
  },
  validationAction: "warn",
  validationLevel:"moderate"
};
module.exports = {todo}

