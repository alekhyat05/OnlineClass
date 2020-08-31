import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { Form, Button, Col, Row, Container, Jumbotron } from "react-bootstrap";
import axios from "axios";
class Home extends Component {
  constructor(props) {
    super(props);
    this.username = React.createRef();
    this.password = React.createRef();
    this.state = {
      errorMessage: "",
      loginStatus: false,
      role: ""
    };
  }
  handleLogin() {
    axios
      .get(
        "http://localhost:5000/login?name=" +
          this.username.current.value +
          "&password=" +
          this.password.current.value
      )
      .then(res => {
        if (res.data.success === true && res.data.data.length > 0) {
          this.setState({ loginStatus: true, role: res.data.data[0].role });
        } else if (res.data.success === false) {
          this.setState({ errorMessage: "Error connecting the network" });
        } else {
          this.setState({ errorMessage: "Invalid credentials" });
        }
      });
  }
  render() {
    if (this.state.loginStatus === false) {
      return (
        <Container>
          <Jumbotron>
            <Container>
              <Row>
                <Col>
                  <h3>Log in</h3>
                </Col>
              </Row>
              <Row>
                <Col>
                  {this.state.errorMessage !== "" ? (
                    <div className="error-message">
                      {this.state.errorMessage}
                    </div>
                  ) : (
                    ""
                  )}
                </Col>
              </Row>
              <Form>
                <Form.Group>
                  <Form.Label>Enter Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    id="username"
                    className="mb-3"
                    ref={this.username}
                  />
                  <Form.Label>Enter Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    id="password"
                    className="mb-3"
                    ref={this.password}
                  />

                  <Button
                    style={{ marginTop: "2rem", width: "8rem" }}
                    block
                    onClick={() => this.handleLogin()}
                  >
                    Sign in
                  </Button>
                </Form.Group>
              </Form>
            </Container>
          </Jumbotron>
        </Container>
      );
    } else {
      if (this.state.role === "teacher") {
        return (
          <Redirect
            to={{ pathname: "/teacher", name: this.username.current.value }}
          />
        );
      } else {
        return (
          <Redirect
            to={{ pathname: "/student", name: this.username.current.value }}
          />
        );
      }
    }
  }
}

export default Home;
