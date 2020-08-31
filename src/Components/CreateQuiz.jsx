import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Jumbotron, Button, Form } from "react-bootstrap";
class CreateQuiz extends Component {
  constructor(props) {
    super(props);
    this.question = React.createRef();
    this.choiceOne = React.createRef();
    this.choiceTwo = React.createRef();
    this.choiceThree = React.createRef();
    this.choiceFour = React.createRef();
    this.answerNumber = React.createRef();
    this.questions = [];
    this.quizNumber = "";
    this.errorPresent = false;
    this.state = {
      quizSaved: false,
      errorMessage: ""
    };
  }

  handleAnswerValidation() {
    if (
      this.question.current.value === "" ||
      this.choiceOne.current.value === "" ||
      this.choiceTwo.current.value === "" ||
      this.choiceThree.current.value === "" ||
      this.answerNumber.current.value > 4 ||
      this.answerNumber.current.value < 1
    ) {
      this.errorPresent = true;
      this.setState({
        errorMessage: "Enter valid values in all the fields"
      });
    }
  }
  handleQuizSave() {
    this.handleCreateNextQuestion();
    console.log("errorpresent", this.errorPresent);
    if (this.errorPresent === false) {
      axios
        .post("http://localhost:5000/savequiz", { quiz: this.questions })
        .then(res => {
          this.quizNumber = res.data.quizId;
          this.setState({ quizSaved: true });
        });
    }
  }
  handleCreateNextQuestion() {
    this.handleAnswerValidation();
    if (this.errorPresent === false) {
      let quizQuestion = {
        question: this.question.current.value,
        choiceOne: this.choiceOne.current.value,
        choiceTwo: this.choiceTwo.current.value,
        choiceThree: this.choiceThree.current.value,
        choiceFour: this.choiceFour.current.value,
        correctOption: this.answerNumber.current.value
      };
      this.questions.push(quizQuestion);
      this.question.current.value = "";
      this.choiceOne.current.value = "";
      this.choiceTwo.current.value = "";
      this.choiceThree.current.value = "";
      this.choiceFour.current.value = "";
      this.answerNumber.current.value = "";
    }
  }
  handleRemoveErrorMessage() {
    this.errorPresent = false;
    this.setState({
      errorMessage: ""
    });
  }

  render() {
    if (this.state.quizSaved) {
      return (
        <Redirect
          to={{
            pathname: "/assigntostudents",
            quizId: this.quizNumber,
            name: this.props.location.name
          }}
        />
      );
    } else {
      return (
        <Container>
          <Jumbotron>
            <Row>
              <Col>
                <h1>Create a Quiz</h1>
              </Col>
            </Row>
            {this.state.errorMessage !== "" ? (
              <Row>
                <Col className="error-message">{this.state.errorMessage}</Col>
              </Row>
            ) : (
              ""
            )}

            <Form>
              <Form.Group>
                <Form.Label>Enter the question:</Form.Label>
                <Form.Control
                  type="text"
                  name="question"
                  id="question"
                  className="mb-3"
                  ref={this.question}
                  onChange={() => this.handleRemoveErrorMessage()}
                />
                <Form.Label>Enter the Choice 1:</Form.Label>
                <Form.Control
                  type="text"
                  name="choiceOne"
                  id="choiceOne"
                  className="mb-3"
                  ref={this.choiceOne}
                  onChange={() => this.handleRemoveErrorMessage()}
                />
                <Form.Label>Enter the Choice 2:</Form.Label>
                <Form.Control
                  type="text"
                  name="choiceTwo"
                  id="choiceTwo"
                  className="mb-3"
                  ref={this.choiceTwo}
                  onChange={() => this.handleRemoveErrorMessage()}
                />
                <Form.Label> Enter the Choice 3:</Form.Label>
                <Form.Control
                  type="text"
                  name="choiceThree"
                  id="choiceThree"
                  className="mb-3"
                  ref={this.choiceThree}
                  onChange={() => this.handleRemoveErrorMessage()}
                />
                <Form.Label> Enter the Choice 4:</Form.Label>
                <Form.Control
                  type="text"
                  name="choiceFour"
                  id="choiceFour"
                  className="mb-3"
                  ref={this.choiceFour}
                  onChange={() => this.handleRemoveErrorMessage()}
                />
                <Form.Label> Enter the correct choice number:</Form.Label>
                <Form.Control
                  style={{ width: "10rem" }}
                  type="number"
                  max="4"
                  name="answerNumber"
                  id="answerNumber"
                  className="mb-3"
                  onChange={() => this.handleRemoveErrorMessage()}
                  ref={this.answerNumber}
                />

                <Row>
                  <Col md={6}>
                    <Button onClick={() => this.handleCreateNextQuestion()}>
                      Create another question
                    </Button>
                  </Col>
                  <Col md={6}>
                    <Button onClick={() => this.handleQuizSave()}>
                      Finish quiz creation
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
            </Form>
          </Jumbotron>
        </Container>
      );
    }
  }
}

export default CreateQuiz;
