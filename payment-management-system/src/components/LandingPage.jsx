import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
const btnSpace = {
  margin: "20px 20px 0 0",
};

export default function LandingPage() {
  return (
    <div style={{ padding: "200px 0 250px 0" }}>
      {LandingPage}
      <br />
      <h1>Welcome to PaymentZ!!</h1>
      <h2>A gateway to make your payment tracking among groups simpler.</h2>
      <div>
        <Link to="/signin">
          <Button style={btnSpace} variant="contained" color="primary">
            {" "}
            Login{" "}
          </Button>
        </Link>
        <Link to="/signup">
          <Button style={btnSpace} variant="contained" color="secondary">
            {" "}
            Signup{" "}
          </Button>
        </Link>
      </div>
    </div>
  );
}
