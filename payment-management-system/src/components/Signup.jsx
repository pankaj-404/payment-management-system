import React from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "10% 25%",
        justifyItems: "space-around",
        padding: "20px ",
        border: "1px solid black",
        // margin: "0 20%",
      }}
    >
      Signup
      <br />
      <label>
        Name
        <input placeholder="Name" />
      </label>
      <label>
        Email
        <input placeholder="Email address" />
      </label>
      <label>
        Password
        <input placeholder="Password" />
      </label>
      <Link to="/transactions">
        <button>Signin</button>
      </Link>
    </div>
  );
}
