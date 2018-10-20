import React, { Component } from "react";
import ReactDOM from 'react-dom'
import { Button, FormGroup, FormControl, ControlLabel, FieldGroup, Col, Navbar, Nav, NavItem } from "react-bootstrap";
import "./Login.css";
import { sessionService } from 'redux-react-session';
import { Auth } from "aws-amplify";
import { connect } from 'react-redux';

class CompanyNavbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <p style={{"fontWeight": "bold","color": "#e9b51e"}}>Y&L Consulting</p>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1} href="#">
            Home
          </NavItem>
          <NavItem eventKey={2} href="#">
            Documents
          </NavItem>
          <NavItem eventKey={2} href="#">
            Create Timesheet
          </NavItem>
        </Nav>
        <Nav pullRight>
          <br />
          <p>Logged in as {localStorage.user}</p>
        </Nav>
      </Navbar>
    );
  }
}

export default CompanyNavbar;
