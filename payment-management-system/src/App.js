import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Routes from "./components/Routes";
// import Body from "./components/Body";
import Signin from "./components/Signin";

function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
      <Routes />
    </div>
  );
}

export default App;
