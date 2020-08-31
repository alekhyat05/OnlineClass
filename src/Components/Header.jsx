import React, { Component } from "react";
import { Col, Row, Container } from "react-bootstrap";
class Header extends Component {
  state = {};
  handleClearSession() {
    sessionStorage.clear();
  }
  render() {
    return (
      <React.Fragment>
        <Container fluid>
          <Row className="app-header">
            <Container>
              <Row>
                <Col md={10}>
                  <h1>E Class</h1>
                </Col>

                <a
                  href="http://localhost:3000/"
                  className="link-btn two-padding"
                  onClick={() => this.handleClearSession()}
                >
                  Log out
                </a>
              </Row>
            </Container>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default Header;
