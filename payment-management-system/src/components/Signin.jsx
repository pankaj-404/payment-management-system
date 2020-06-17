import React from "react";
import { Link, Router, Redirect, useHistory } from "react-router-dom";
import { signin } from "../redux/action";
import { connect } from "react-redux";
import { TextField, Button, Container, Box } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isSignin: false,
    };
  }

  handleChnage = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleClick = (payload) => {
    const { email, password } = this.state;
    const { signin, usersData, history } = this.props;
    payload = payload;
    if (
      Object.keys(usersData).length > 0 &&
      email &&
      password &&
      usersData.hasOwnProperty(email) &&
      usersData[email].password
    ) {
      payload = { ...payload, isSignin: true };
      this.setState({
        isSignin: true,
      });
      signin(payload);
      history.push("/home");
    } else {
      return <Alert severity="error">"Invalid Credentials"</Alert>;
    }
  };

  render() {
    const { email, password } = this.state;
    return (
      <div style={{ padding: "165px 0 220px 0 " }}>
        <div
          style={{
            color: "azure",
            fontFamily: "Abril Fatface, cursive",
            fontSize: "30px",
            marginBottom: 10,
            letterSpacing: 3,
          }}
        >
          SIGN-IN FORM
        </div>
        <Container
          style={{
            border: "1px solid white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "400px",
            textAlign: "center",
            padding: 10,
            background: "white",
          }}
        >
          <TextField
            required
            label="Email"
            onChange={(e) => this.handleChnage(e)}
            value={email}
            type="email"
            name="email"
            placeholder="Email address"
          />
          <TextField
            required
            label="Password"
            onChange={(e) => this.handleChnage(e)}
            value={password}
            type="password"
            name="password"
          />
          <Box>
            <Button
              style={{ width: 100, margin: "20px 10px 10px 0" }}
              size="small"
              variant="contained"
              fullWidth="false"
              color="primary"
              onClick={() => this.handleClick(this.state)}
            >
              Login
            </Button>
            <Button
              style={{ width: 100, margin: "20px 10px 10px 0" }}
              size="small"
              variant="contained"
              fullWidth="false"
              onClick={() => {
                this.props.history.push("/signup");
              }}
              color="secondary"
            >
              Signup
            </Button>
          </Box>
        </Container>
      </div>
    );
  }
}

const mapStasteToProps = (state) => ({
  usersData: state.users,
});

const mapDispatchToProps = (dispatch) => ({
  signin: (payload) => dispatch(signin(payload)),
});

export default connect(mapStasteToProps, mapDispatchToProps)(Signup);
