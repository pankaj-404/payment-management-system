// Transactions,stats,settings,logout
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
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
        <button>LOGOUT</button>{" "}
      </Link>
    </div>
  );
}
