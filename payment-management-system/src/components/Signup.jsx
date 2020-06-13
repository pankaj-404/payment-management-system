import React from "react";
import { Link, Router, Redirect, useHistory } from "react-router-dom";
import { signup } from "../redux/action";
import { connect } from "react-redux";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      isSignup: false,
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
        Signup
        <br />
        <label>
          Name
          <input
            onChange={(e) => this.handleChnage(e)}
            value={name}
            type="text"
            name="name"
            placeholder="Name"
          />
        </label>
        <label>
          Email
          <input
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
            onChange={(e) => this.handleChnage(e)}
            value={password}
            type="password"
            name="password"
            placeholder="Password"
          />
        </label>
        <button
          onClick={() => {
            this.handleClick(this.state);
          }}
        >
          Signup
        </button>
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
