import React, { Component } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
class StudentList extends Component {
  state = {
    studentList: []
  };
  componentDidMount() {
    axios
      .get(
        "http://localhost:5000/getStudentListInClass?name=" +
          this.props.location.className
      )
      .then(res => {
        this.setState({ studentList: res.data.data });
      })
      .then(() => {
        let studentList = [...this.state.studentList];
        studentList.forEach(student => {
          let totalMarks = 0;
          student.quizzes.forEach(element => {
            if (element.status === "completed")
              totalMarks += parseInt(element.marks);
          });
          student.totalMarks = totalMarks;
        });
        this.setState({ studentList: this.state.studentList });
      });
  }

  render() {
    const studentList = this.state.studentList;
    return (
      <Container>
        <h2>List of Students in this class</h2>
        <h4>{this.props.location.className}</h4>
        <Row>
          <Col>
            <b>Name</b>
          </Col>
          <Col>
            <b>Total Marks</b>
          </Col>

          <hr />
        </Row>
        {studentList.length < 0 ? (
          <Row>Fetching the data from the database</Row>
        ) : (
          studentList.map((studentName, index) => (
            <Row key={index}>
              <Col>{studentName.name}</Col>
              <Col>{studentName.totalMarks}</Col>
              <hr />
            </Row>
          ))
        )}
      </Container>
    );
  }
}

export default StudentList;
