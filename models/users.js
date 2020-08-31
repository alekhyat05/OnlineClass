const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure
const DataSchema = new Schema({
  role: String,
  name: String,
  password: String,
  classes: Array,
  quizzes: [
    {
      id: String,
      status: String,
      marks: String,
      selectedAnswers: [
        {
          questionNumber: Number,
          answer: Number
        }
      ]
    }
  ]
});

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Users", DataSchema, "Users");
