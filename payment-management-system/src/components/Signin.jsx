import React from "react";
import { Link } from "react-router-dom";

export default function Signin() {
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
        <input placeholder="Email address" />
      </label>
      <label>
        Password
        <input placeholder="Password" />
      </label>
      <div>
        <Link to="/home">
          <button>Signin</button>
        </Link>
        <Link to="/signup">
          <button>Signup</button>
        </Link>
      </div>
    </div>
  );
}
