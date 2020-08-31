const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const path = require("path");
const Users = require("./models/users");
const Classes = require("./models/classes");
const Quizzes = require("./models/quizzes");
const API_PORT = 5000;
const app = express();
app.use(cors());
app.use(express.json());
//app.use(logger("dev"));

const dbRoute = "mongodb+srv://Enter your DB Route";

mongoose.connect(dbRoute, { useNewUrlParser: true });
let db = mongoose.connection;
db.once("open", () => {
  console.log("connected to the database");
});
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/getClassList", (req, res) => {
  Users.find(
    {
      name: req.query.name,
    },
    (err, data) => {
      if (err) {
        return res.json({ success: false, error: err });
      } else {
        return res.json({ success: true, data: data });
      }
    }
  );
});

app.get("/getStudentListInClass", (req, res) => {
  Users.find({ classes: req.query.name, role: "student" }, (err, data) => {
    if (err) {
      return res.json({ success: false, error: err });
    } else {
      return res.json({ success: true, data: data });
    }
  });
});

app.get("/login", (req, res) => {
  Users.find(
    { name: req.query.name, password: req.query.password },
    (err, data) => {
      if (err) {
        return res.json({ success: false, error: err });
      } else {
        return res.json({ success: true, data: data });
      }
    }
  );
});

app.get("/getStudentInfo", (req, res) => {
  Users.find(
    {
      name: req.query.name,
    },
    (err, data) => {
      if (err) {
        return res.json({ success: false, error: err });
      } else {
        return res.json({ success: true, data: data });
      }
    }
  );
});

app.get("/getQuiz", (req, res) => {
  Quizzes.findById(
    {
      _id: req.query.id,
    },
    (err, data) => {
      if (err) {
        return res.json({ success: false, error: err });
      } else {
        return res.json({ success: true, data: data });
      }
    }
  );
});

app.get("/getSelectedAnswers", (req, res) => {
  Users.find(
    {
      name: req.query.studentName,
    },
    (err, data) => {
      if (err) {
        return res.json({ success: false, error: err });
      } else {
        data[0].quizzes.forEach((quiz) => {
          if (quiz.id == req.query.id) {
            return res.json({ success: true, data: quiz.selectedAnswers });
          }
        });
      }
    }
  );
});

app.post("/savequiz", (req, res) => {
  const quiz = new Quizzes({
    quiz_name: "name",
    questions: req.body.quiz,
  });

  quiz.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, quizId: quiz._id });
  });
});

app.post("/assignQuizToStudents", (req, res) => {
  const quiz = {
    id: req.body.quizID,
    status: "pending",
    marks: "0",
  };
  req.body.studentList.forEach((studentName) => {
    Users.findOneAndUpdate(
      { name: studentName },
      {
        $push: {
          quizzes: quiz,
        },
      },
      { safe: true, upsert: true },
      function (err, doc) {
        if (err) {
          console.log(err);
        } else {
          res.send("success");
        }
      }
    );
  });
});

app.post("/updatequizmarks", (req, res) => {
  Users.update(
    {
      "quizzes.id": req.body.quizId,
      name: req.body.studentName,
    },
    {
      $set: {
        "quizzes.$.status": "completed",
        "quizzes.$.marks": req.body.marks,
        "quizzes.$.selectedAnswers": [],
      },
    },
    { safe: true, upsert: true },
    function (err, doc) {
      if (err) {
        console.log(err);
      }
    }
  ).then(() => {
    Users.findOneAndUpdate(
      { name: req.body.studentName },
      { selectedAnswers: [] },
      function (err, doc) {
        if (err) {
          console.log(err);
        } else {
          res.send("success");
        }
      }
    );
  });
});

app.post("/savestudentquiz", (req, res) => {
  Users.update(
    { "quizzes.id": req.body.quizId, name: req.body.studentName },
    {
      $set: {
        "quizzes.$.status": "yet to complete",
        "quizzes.$.selectedAnswers": req.body.selectedAnswers,
      },
    },
    { safe: true, upsert: true },
    function (err, doc) {
      if (err) {
        console.log(err);
      } else {
        res.send("success");
      }
    }
  );
});

app.get("/getStudentList", (req, res) => {
  Users.find(
    {
      role: "student",
    },
    (err, data) => {
      if (err) {
        return res.json({ success: false, error: err });
      } else {
        return res.json({ success: true, data: data });
      }
    }
  );
});

// launch our backend into a port
//app.listen(process.env.PORT, () => console.log(`LISTENING ON PROD`));
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));

//Serve static assets if in production
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
// }
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
// });
