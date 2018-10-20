import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import { sessionService } from 'redux-react-session';
import { Auth } from "aws-amplify";
import { connect } from 'react-redux';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      challenge: "",
      p1: "",
      p2: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  validateFormNP() {
    return this.state.p1 != "" && this.state.p1 == this.state.p2;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    try {
      await Auth.signIn(this.state.email, this.state.password)
      .then(user => {
        if (user.challengeName == "NEW_PASSWORD_REQUIRED") {
          this.setState({
            challenge: user.challengeName
          })
        } else {
          localStorage.setItem("user", user.username)
          sessionService.saveUser(user)
          sessionService.saveSession(user.signInUserSession)
        }
      }
    )
    } catch (e) {
      alert(e.message);
    }
  }

  handleSubmitNP = async event => {
    event.preventDefault();
    if (this.state.p1 == this.state.p2) {
      try {
        await this.state.user.completeNewPasswordChallenge(this.state.p1, {}, {
          onSuccess: function (result){
            console.log(result);
          },
          authSuccess: function (result){
            //Password has been updated.
            console.log(result);
          },
          onFailure: function(err) {
            alert(err.message);
          }
        })
      } catch (e) {
        alert(e.message);
      }
    }
  }

  render() {

    var warning = ""
    if (this.state.p1 != this.state.p2) {
      warning = <h3 style={{color: "red"}}>Passwords do not match</h3>
    } else if (this.state.p1 != "" && this.state.p1 == this.state.p2){
      warning = <h3 style={{color: "green"}}>Passwords match!</h3>
    }

    if (this.state.challenge == "") {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="email" bsSize="large">
              <ControlLabel>Email</ControlLabel>
              <FormControl
                autoFocus
                type="username"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
              <ControlLabel>Password</ControlLabel>
              <FormControl
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
              />
            </FormGroup>
            <Button
              block
              bsSize="large"
              disabled={!this.validateForm()}
              type="submit"
            >
              Login
            </Button>
          </form>
        </div>
      );
    } else if (this.state.user.challenge == "NEW_PASSWORD_REQUIRED") {
      return (
        <div>
          <form onSubmit={this.handleSubmitNP}>
            <FormGroup controlId="p1" bsSize="large">
              <ControlLabel>New Password</ControlLabel>
              <FormControl
                autoFocus
                type="password"
                value={this.state.p1}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="p2" bsSize="large">
              <ControlLabel>New Password Confirmation</ControlLabel>
              <FormControl
                value={this.state.p2}
                onChange={this.handleChange}
                type="password"
              />
            </FormGroup>
            <Button
              block
              bsSize="large"
              disabled={!this.validateFormNP()}
              type="submit"
            >
              Login
            </Button>
          </form>
          {warning}
          <h4>Passwords Must:</h4>
          <ul>
            <li>Be at least 8 characters long</li>
            <li>Contain a symbol character</li>
            <li>Contain a number</li>
            <li>Contain a lowercase letter</li>
            <li>Contain a uppercase letter</li>
          </ul>
        </div>
      )
    } else {
      return (
        <h1>Logged In!</h1>
      )
    }
  }
}

const mapStateToProps = (state) => {
    return  {
      authenticated: false,
      name: "anonymous"
    }
}

export default connect(mapStateToProps)(Login);
