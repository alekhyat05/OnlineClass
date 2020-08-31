const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure
const DataSchema = new Schema({
  quiz_name: String,
  questions: [
    {
      question: String,
      choiceOne: String,
      choiceTwo: String,
      choiceThree: String,
      choiceFour: String,
      correctOption: Number
    }
  ]
});

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Quizzes", DataSchema, "Quizzes");
