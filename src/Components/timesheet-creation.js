import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel, FieldGroup, Col } from "react-bootstrap";
import "./Login.css";
import { sessionService } from 'redux-react-session';
import { Auth } from "aws-amplify";
import { connect } from 'react-redux';

class TimesheetCreation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        "Username":"tempUsername",
        "Role":"Developer",
        "clients": {
          "Client 1": {
            "Projects": [
              "Project 1",
              "Project 2"
            ]
          },
          "Client 2": {
            "Projects": [
              "Project 3"
            ]
          },
          "Non-Billable": {
            "Projects": [
              "Project 4"
            ]
          }
        }
      },
    currentClientProjects: ["Project 1","Project 2"],
    currentClient: "Client 1"
    };
  }

  validateForm() {
  }

  getValidationState() {
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleProjectChange() {
    this.setState({
      currentClient: this.inputEl.value,
      currentClientProjects: this.state.data.clients[this.inputEl.value].Projects
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <Col xs={1} md={2} />
        <Col xs={8} md={8}>
          <br />
          <h1>Timesheet Builder</h1>
          <form onSubmit={this.handleSubmit}>
            <ControlLabel>Select Client</ControlLabel>
            <Col xs={12} md={12}>
              <br />
              <Col xs={4} md={4} />
              <Col xs={4} md={4}>
                <FormControl
                  inputRef={ el => this.inputEl=el }
                  componentClass="select"
                  onChange={this.handleProjectChange.bind(this)}
                >
                  {Object.keys(this.state.data.clients).map((item,i) =>
                    <option value={item}>{item}</option>
                  )}
                </FormControl>
              </Col>
              <Col xs={4} md={4} />
              <br />
              <br />
              <br />
            </Col>
            {this.state.currentClientProjects.map((item,i) =>
              <div>
                <Col xs={3} md={3}>
                  <ControlLabel>{item}</ControlLabel>
                </Col>
                <Col xs={1} md={1}>
                  <FormGroup
                    controlId="formBasicText"
                    validationState={this.getValidationState()}
                  >
                  <ControlLabel>Mon</ControlLabel>
                    <FormControl
                      type="text"
                      value={this.state.value}
                      placeholder="0"
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col xs={1} md={1}>
                  <FormGroup
                    controlId="formBasicText"
                    validationState={this.getValidationState()}
                  >
                  <ControlLabel>Tues</ControlLabel>
                    <FormControl
                      type="text"
                      value={this.state.value}
                      placeholder="0"
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col xs={1} md={1}>
                  <FormGroup
                    controlId="formBasicText"
                    validationState={this.getValidationState()}
                  >
                  <ControlLabel>Wed</ControlLabel>
                    <FormControl
                      type="text"
                      value={this.state.value}
                      placeholder="0"
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col xs={1} md={1}>
                  <FormGroup
                    controlId="formBasicText"
                    validationState={this.getValidationState()}
                  >
                  <ControlLabel>Thur</ControlLabel>
                    <FormControl
                      type="text"
                      value={this.state.value}
                      placeholder="0"
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col xs={1} md={1}>
                  <FormGroup
                    controlId="formBasicText"
                    validationState={this.getValidationState()}
                  >
                  <ControlLabel>Fri</ControlLabel>
                    <FormControl
                      type="text"
                      value={this.state.value}
                      placeholder="0"
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col xs={1} md={1}>
                  <FormGroup
                    controlId="formBasicText"
                    validationState={this.getValidationState()}
                  >
                  <ControlLabel>Sat</ControlLabel>
                    <FormControl
                      type="text"
                      value={this.state.value}
                      placeholder="0"
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col xs={1} md={1}>
                  <FormGroup
                    controlId="formBasicText"
                    validationState={this.getValidationState()}
                  >
                  <ControlLabel>Sun</ControlLabel>
                    <FormControl
                      type="text"
                      value={this.state.value}
                      placeholder="0"
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                </Col>
              </div>
            )}
            <Col xs={4} md={4} />
            <Col xs={4} md={4}>
              <br />
              <Button
                block
                bsSize="large"
                type="submit"
              >
                Create Timesheet
              </Button>
            </Col>
          </form>
        </Col>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return  {
    authenticated: true,
    name: state.session.user.username,
    user: state.session.user
  }
}

export default connect(mapStateToProps)(TimesheetCreation);
