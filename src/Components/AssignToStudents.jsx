import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Input, Label } from "reactstrap";
class AssignToStudents extends Component {
  constructor(props) {
    super(props);
    this.selectedStudents = [];
  }
  state = {
    studentList: [],
    errorMessage: "",
    redirect: false
  };
  componentDidMount() {
    axios.get("http://localhost:5000/getStudentList?").then(res => {
      this.setState({ studentList: res.data.data });
    });
  }
  handleSelectedStudents(studentName) {
    this.setState({ erroMessage: "" });
    if (!this.selectedStudents.includes(studentName)) {
      this.selectedStudents.push(studentName);
    } else {
      this.selectedStudents.splice(this.selectedStudents.indexOf(studentName));
    }
  }
  handleQuizAssign() {
    if (this.selectedStudents.length > 0) {
      axios
        .post("http://localhost:5000/assignQuizToStudents", {
          studentList: this.selectedStudents,
          quizID: this.props.location.quizId
        })
        .then(res => {
          this.setState({ redirect: true });
        });
    } else {
      this.setState({ errorMessage: "Please select at least one student" });
    }
  }
  render() {
    const studentList = this.state.studentList;
    if (this.state.redirect === false) {
      return (
        <Container>
          <Row>
            <Col>
              <h3>Assign to Individual Students</h3>
            </Col>
          </Row>
          {this.state.errorMessage !== "" ? (
            <Row className="error-message">
              <Col>{this.state.errorMessage}</Col>
            </Row>
          ) : (
            ""
          )}

          <Row className="one-padding-left">
            <Col>
              {studentList.length > 0 ? (
                studentList.map((student, index) => (
                  <Row key={index}>
                    <Col>
                      <Input
                        type="checkbox"
                        className="mb-3"
                        onClick={() =>
                          this.handleSelectedStudents(student.name)
                        }
                      />
                      <Label>{student.name}</Label>
                    </Col>
                  </Row>
                ))
              ) : (
                <div>Fetching data from the database</div>
              )}
            </Col>
          </Row>

          <Button className="link-btn" onClick={() => this.handleQuizAssign()}>
            Assign to students
          </Button>
        </Container>
      );
    } else {
      return (
        <Redirect
          to={{
            pathname: "/teacher",
            confirmationMessage: "Quiz is successfully assigned to students"
          }}
        />
      );
    }
  }
}

export default AssignToStudents;
