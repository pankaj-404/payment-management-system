import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

function LandingPage() {
  return (
    <>
      {LandingPage}
      <br />
      <Link to="/signin">
        <button> Signin </button>
      </Link>
      <Link to="/signup">
        <button> Signup </button>
      </Link>
    </>
  );
}

export default connect(null)(LandingPage);
