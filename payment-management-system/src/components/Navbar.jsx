// Transactions,stats,settings,logout
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout, signin, signup } from "../redux/action";

function Navbar(props) {
  const { logout, signin, currentUser, isSignin, signup } = props;
  return (
    <div
      style={{
        background: "gray",
        padding: "10px 30px",
        color: "white",
        textDecoration: "none",
      }}
    >
      {/* <Link to="/">Home</Link> */}
      <Link
        style={{
          padding: "10px 30px",
          color: "white",
          textDecoration: "none",
          fontSize: 25,
        }}
        to="/home"
      >
        Home
      </Link>
      <Link
        style={{
          padding: "10px 30px",
          color: "white",
          textDecoration: "none",
          fontSize: 25,
        }}
        to="/transactions"
      >
        Transactions
      </Link>
      <Link
        style={{
          padding: "10px 30px",
          color: "white",
          textDecoration: "none",
          fontSize: 25,
        }}
        to="/stats"
      >
        Stats
      </Link>
      <Link
        style={{
          padding: "10px 30px",
          color: "white",
          textDecoration: "none",
          fontSize: 25,
        }}
        to="/settings"
      >
        Settings
      </Link>
      <Link to="/" style={{ float: "right" }}>
        {/* {currentUser == "" && (
          <span>
            <button>signin</button>
            <button>signup</button>
          </span>
        )} */}
        {currentUser !== "" && <button onClick={() => logout()}>LOGOUT</button>}
      </Link>
    </div>
  );
}

const mapStasteToProps = (state) => ({
  usersData: state.users,
  isSignin: state.isSignin,
  currentUser: state.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  logout: (payload) => dispatch(logout(payload)),
  signin: (payload) => dispatch(signin(payload)),
  signup: (payload) => dispatch(signup(payload)),
});

export default connect(mapStasteToProps, mapDispatchToProps)(Navbar);
