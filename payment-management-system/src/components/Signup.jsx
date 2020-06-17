import React from "react";
import { Link, Router, Redirect, useHistory } from "react-router-dom";
import { signup } from "../redux/action";
import { connect } from "react-redux";
import { Container, TextField, Button } from "@material-ui/core";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      isSignup: false,
      youBorrowed: 0,
      youLent: 0,
      totalExpense: 0,
    };
  }

  handleChnage = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleClick = (payload) => {
    const { name, email, password } = this.state;
    const { signup, history } = this.props;
    name && email && password && signup(payload) && history.push("/");
  };

  render() {
    const { name, email, password } = this.state;
    return (
      <div style={{ padding: "160px 0 180px 0 " }}>
        <div
          style={{
            color: "azure",
            fontFamily: "Abril Fatface, cursive",
            fontSize: "30px",
            marginBottom: 10,
            letterSpacing: 3,
          }}
        >
          SIGN-UP FORM
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
            label="Name"
            onChange={(e) => this.handleChnage(e)}
            value={name}
            type="text"
            name="name"
            placeholder="Name"
          />
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
            placeholder="Password"
          />
          <Button
            style={{ margin: 10 }}
            variant="contained"
            color="secondary"
            onClick={() => {
              this.handleClick(this.state);
            }}
          >
            Signup
          </Button>
        </Container>
      </div>
    );
  }
}

const mapStasteToProps = (state) => ({
  usersData: state.users,
});

const mapDispatchToProps = (dispatch) => ({
  signup: (payload) => dispatch(signup(payload)),
});

export default connect(mapStasteToProps, mapDispatchToProps)(Signup);
