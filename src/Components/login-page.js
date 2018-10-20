import React, { Component } from 'react';
import logo from '../logo.png';
import Login from './login-form.js'
import { Button, FormGroup, FormControl, ControlLabel, Col, Grid, Row} from "react-bootstrap";
import '../App.css';

class LoginPage extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Grid>
            <Row>
              <Col xs={5} md={5} lg={1} style={{background: "dark-gray"}}>
                <img src={logo} className="App-logo" alt="logo" />
              </Col>
              <Col xs={1} md={1} lg={4} />
              <Col xs={6} md={6} lg={7}>
                <Login />
              </Col>
            </Row>
          </Grid>
        </header>
      </div>
    );
  }
}

export default LoginPage;
