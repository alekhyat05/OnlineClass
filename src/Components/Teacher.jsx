import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
class Teacher extends Component {
  constructor(props) {
    super(props);
    this.userName = "";
  }
  state = {
    classList: []
  };
  componentDidMount() {
    if (sessionStorage.getItem("userName") === null) {
      sessionStorage.setItem("userName", this.props.location.name);
    }
    if (
      this.props.location.name === null ||
      this.props.location.name === undefined
    ) {
      this.userName = sessionStorage.getItem("userName");
    } else {
      this.userName = this.props.location.name;
    }

    console.log("this.userName", this.userName);
    if (sessionStorage.getItem("classList") !== null) {
      let classListFromSession = sessionStorage.getItem("classList");
      this.setState({ classList: classListFromSession.split(",") });
    } else {
      axios
        .get("http://localhost:5000/getClassList?name=" + this.userName)
        .then(res => {
          this.setState({ classList: res.data.data[0].classes });
          sessionStorage.setItem("classList", res.data.data[0].classes);
        });
    }
  }
  render() {
    const classList = this.state.classList;
    return (
      <Container>
        <Row className="two-margin-top-bottom">
          <Col>
            <h3>Name: {this.userName}</h3>
          </Col>
          <Col style={{ textAlign: "right" }}>
            <Button>
              <Link
                className="link-btn"
                to={{
                  pathname: "/createquiz",
                  name: this.userName
                }}
              >
                Create quiz
              </Link>
            </Button>
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
          {classList.length <= 0 ? (
            <Col>Fetching the classes from the database</Col>
          ) : (
            classList.map((className, index) => (
              <Col md={4} key={index}>
                <Card
                  style={{ width: "18rem" }}
                  className="two-margin-top-bottom"
                >
                  <Card.Body>
                    <Card.Title>
                      <Link
                        to={{
                          pathname: "/studentlist",
                          className: className
                        }}
                      >
                        {className}
                      </Link>
                    </Card.Title>
                    <Card.Text>Click here to view the student list.</Card.Text>
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

export default Teacher;
