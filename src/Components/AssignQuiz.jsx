import React, { Component } from "react";
import { Link } from "react-router-dom";
class AssignQuiz extends Component {
  state = {};
  render() {
    console.log("In assign quiz", this.props.location.quizId);
    return (
      <React.Fragment>
        <h1>Assign quiz to students </h1>

        <Link
          to={{
            pathname: "/assigntoclass",
            quizId: this.props.location.quizId
          }}
        >
          Assign quiz to whole class
        </Link>
        <Link
          to={{
            pathname: "/assigntostudents",
            quizId: this.props.location.quizId
          }}
        >
          Assign quiz individual students
        </Link>
      </React.Fragment>
    );
  }
}

export default AssignQuiz;
