import React from "react";
import { Link, Router, Redirect, useHistory } from "react-router-dom";
import { signin } from "../redux/action";
import { connect } from "react-redux";

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
    }
  };

  render() {
    const { email, password } = this.state;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "10% 25%",
          justifyItems: "space-around",
          padding: "20px ",
          border: "1px solid black",
        }}
      >
        Signin
        <br />
        <label>
          Email
          <input
            style={{ margin: 10 }}
            onChange={(e) => this.handleChnage(e)}
            value={email}
            type="email"
            name="email"
            placeholder="Email address"
          />
        </label>
        <label>
          Password
          <input
            style={{ margin: 10 }}
            onChange={(e) => this.handleChnage(e)}
            value={password}
            type="password"
            name="password"
            placeholder="Password"
          />
        </label>
        <button
          style={{ margin: 10 }}
          onClick={() => this.handleClick(this.state)}
        >
          Signin
        </button>
        <Link to="/signup">
          <button style={{ width: "100%", margin: 10 }}>Signup</button>
        </Link>
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
