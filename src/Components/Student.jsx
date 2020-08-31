import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { Container, Row, Col, Card } from "react-bootstrap";
class Student extends Component {
  constructor(props) {
    super(props);
    this.studentName = "";
  }
  state = {
    quizList: []
  };
  componentDidMount() {
    if (sessionStorage.getItem("userName") === null) {
      sessionStorage.setItem("userName", this.props.location.name);
    }
    if (
      this.props.location.name === null ||
      this.props.location.name === undefined
    ) {
      this.studentName = sessionStorage.getItem("userName");
    } else {
      this.studentName = this.props.location.name;
    }

    axios
      .get("http://localhost:5000/getStudentInfo?name=" + this.studentName)
      .then(res => {
        this.setState({ quizList: res.data.data[0].quizzes });
      });
  }
  render() {
    const quizList = this.state.quizList;
    return (
      <Container>
        <Row className="two-margin-top-bottom">
          <Col>
            <h3>Name: {this.studentName}</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            {this.props.location.confirmationMessage ? (
              <h3>{this.props.location.confirmationMessage}</h3>
            ) : (
              ""
            )}
          </Col>
        </Row>
        <Row>
          {quizList.length < 1 ? (
            <Col>You have no quiz assigned</Col>
          ) : (
            quizList.map((quiz, index) => (
              <Col md={4} key={index}>
                <Card
                  style={{ width: "18rem" }}
                  className="two-margin-top-bottom"
                >
                  <Card.Body>
                    <Card.Title className="text-align-center">
                      {quiz.status === "completed" ? (
                        <div>Quiz {index + 1}</div>
                      ) : (
                        <Link
                          to={{
                            pathname: "/quiz",
                            name: this.studentName,
                            quizId: quiz.id
                          }}
                          key={index}
                        >
                          <div>Quiz {index + 1}</div>
                        </Link>
                      )}
                    </Card.Title>

                    <Card.Text>Status: {quiz.status}</Card.Text>
                    {quiz.status === "completed" ? (
                      <Card.Text>Marks: {quiz.marks}</Card.Text>
                    ) : (
                      ""
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>
    );
  }
}

export default Student;
