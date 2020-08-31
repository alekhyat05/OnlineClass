import React, { Component } from "react";
import axios from "axios";
import { Container, Jumbotron, Button, Row, Col } from "react-bootstrap";
import { Label, Input } from "reactstrap";
import { Redirect } from "react-router-dom";
class Quiz extends Component {
  constructor(props) {
    super(props);

    this.marks = 0;
  }
  state = {
    questions: [],
    quizStatus: false,
    selectedAnswers: []
  };
  componentDidMount() {
    axios
      .get(
        "http://localhost:5000/getSelectedAnswers?id=" +
          this.props.location.quizId +
          "&studentName=" +
          this.props.location.name
      )
      .then(res => {
        if (res.data.data) {
          this.setState({ selectedAnswers: res.data.data });
        }
      });
    axios
      .get("http://localhost:5000/getQuiz?id=" + this.props.location.quizId)
      .then(res => {
        this.setState({ questions: res.data.data.questions });
      });
  }
  handleSubmit() {
    this.state.selectedAnswers.forEach(element => {
      if (
        this.state.questions[element.questionNumber].correctOption ===
        element.answer
      ) {
        this.marks++;
      }
    });
    axios
      .post("http://localhost:5000/updatequizmarks", {
        quizId: this.props.location.quizId,
        studentName: this.props.location.name,
        marks: this.marks
      })
      .then(res => {
        this.setState({ quizStatus: "Submitted" });
      });
  }
  handleSave() {
    axios
      .post("http://localhost:5000/savestudentquiz", {
        quizId: this.props.location.quizId,
        studentName: this.props.location.name,
        selectedAnswers: this.state.selectedAnswers
      })
      .then(res => {
        this.setState({ quizStatus: "Saved" });
      });
  }
  handleOptionSelection(questionIndex, selectedOption) {
    if (
      !this.state.selectedAnswers.find(
        element => element.questionNumber === questionIndex
      )
    ) {
      let tempSelectedAnswers = [...this.state.selectedAnswers];
      tempSelectedAnswers.push({
        questionNumber: questionIndex,
        answer: selectedOption
      });
      this.setState({ selectedAnswers: tempSelectedAnswers });
    } else {
      let tempSelectedAnswers = [...this.state.selectedAnswers];

      tempSelectedAnswers.splice(
        tempSelectedAnswers.findIndex(i => i.questionNumber === questionIndex)
      );

      tempSelectedAnswers.push({
        questionNumber: questionIndex,
        answer: selectedOption
      });
      this.setState({ selectedAnswers: tempSelectedAnswers });
    }
  }

  render() {
    const questions = this.state.questions;
    const selectedAnswers = this.state.selectedAnswers;

    selectedAnswers.forEach(savedAnswer => {
      questions.forEach((question, index) => {
        if (index === savedAnswer.questionNumber) {
          question.prevSelectedAnswer = savedAnswer.answer;
        }
      });
    });
    if (this.state.quizStatus === "Submitted") {
      return (
        <Redirect
          to={{
            pathname: "/student",
            confirmationMessage: "Your quiz is successfully submitted",
            name: this.props.location.name
          }}
        />
      );
    } else if (this.state.quizStatus === "Saved") {
      return (
        <Redirect
          to={{
            pathname: "/student",
            confirmationMessage: "Your quiz is successfully saved",
            name: this.props.location.name
          }}
        />
      );
    } else {
      return (
        <Container>
          <Jumbotron>
            {questions.map((question, index) => (
              <div key={index}>
                <Label>
                  {index + 1}
                  {". "}
                  {question.question}
                </Label>
                <br />

                {question.prevSelectedAnswer === 1 ? (
                  <Input
                    type="radio"
                    checked
                    value={question.choiceOne}
                    name={question.question}
                    onChange={() => this.handleOptionSelection(index, 1)}
                  />
                ) : (
                  <Input
                    type="radio"
                    value={question.choiceOne}
                    name={question.question}
                    onChange={() => this.handleOptionSelection(index, 1)}
                  />
                )}

                <Label>{question.choiceOne}</Label>

                <br />
                {question.prevSelectedAnswer === 2 ? (
                  <Input
                    checked
                    type="radio"
                    value={question.choiceTwo}
                    name={question.question}
                    onChange={() => this.handleOptionSelection(index, 2)}
                  />
                ) : (
                  <Input
                    type="radio"
                    value={question.choiceTwo}
                    name={question.question}
                    onChange={() => this.handleOptionSelection(index, 2)}
                  />
                )}

                <Label>{question.choiceTwo}</Label>

                <br />
                {question.prevSelectedAnswer === 3 ? (
                  <Input
                    checked
                    type="radio"
                    value={question.choiceThree}
                    name={question.question}
                    onChange={() => this.handleOptionSelection(index, 3)}
                  />
                ) : (
                  <Input
                    type="radio"
                    value={question.choiceThree}
                    name={question.question}
                    onChange={() => this.handleOptionSelection(index, 3)}
                  />
                )}

                <Label>{question.choiceThree}</Label>

                <br />
                {question.prevSelectedAnswer === 4 ? (
                  <Input
                    type="radio"
                    checked
                    value={question.choiceFour}
                    name={question.question}
                    onChange={() => this.handleOptionSelection(index, 4)}
                  />
                ) : (
                  <Input
                    type="radio"
                    value={question.choiceFour}
                    name={question.question}
                    onChange={() => this.handleOptionSelection(index, 4)}
                  />
                )}

                <Label>{question.choiceFour}</Label>
                <br />
              </div>
            ))}
            <Row className="two-margin-top-bottom ">
              <Col>
                <Button onClick={() => this.handleSave()}>Save</Button>
              </Col>
              <Col>
                <Button onClick={() => this.handleSubmit()}>Submit</Button>
              </Col>
            </Row>
          </Jumbotron>
        </Container>
      );
    }
  }
}

export default Quiz;
