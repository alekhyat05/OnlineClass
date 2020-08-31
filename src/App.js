/*Notes:
    - Have not used Access tokens. Have simply redirected the user if the Username and Password are correct
    - The product is vulnerable to various attacks. The students can manipulate their marks using dev tools
    - The student can find the right answer using the dev tools, Ideally these should have been done on the server side code
  

  To Run the Project:
    - The client side is developed in react and the server side is developed in node.
    - The database used is MongoDB
    - In the root directory, run the following commands - 
        - npm start
        - node server.js
  
  If you wish to use the Database I have already hosted
    - Feel free to use the following credtials to login
      Teacher:
        - Name: John
        - Password: 1234
      Students
        -Name: Tom
        -Password: 1234

        -Name: Angela
        -Password: 1234

        -Name: Mary
        -Password: 1234
*/

import React from "react";
import "./App.css";
import Student from "./Components/Student";
import Teacher from "./Components/Teacher";
import Home from "./Components/Home";
import CreateQuiz from "./Components/CreateQuiz";
import AssignQuiz from "./Components/AssignQuiz";
import AssignToStudents from "./Components/AssignToStudents";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import StudentList from "./Components/StudentList";
import Quiz from "./Components/Quiz";
import Header from "./Components/Header";

function App() {
  return (
    <React.Fragment>
      <Header />
      <BrowserRouter>
        <Switch>
          <Route exact path="/student" component={Student} />
          <Route exact path="/teacher" component={Teacher} />
          <Route exact path="/createquiz" component={CreateQuiz} />
          <Route exact path="/assignquiz" component={AssignQuiz} />
          <Route exact path="/assigntostudents" component={AssignToStudents} />
          <Route exact path="/studentlist" component={StudentList} />
          <Route exact path="/quiz" component={Quiz} />
          <Route exact path="/" component={Home} />
          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
