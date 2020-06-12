import React from "react";
import { Link } from "react-router-dom";
export default function Transactions() {
  return (
    <div>
      Welcome to App Click on ADD for creating GROUP{" "}
      <Link to="/addGroup">ADD</Link>
    </div>
  );
}
