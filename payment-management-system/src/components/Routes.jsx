import React from "react";
import { Route, Switch } from "react-router-dom";
import Signin from "./Signin";
import Signup from "./Signup";
import Transactions from "./Transactions";
import Settings from "./Settings";
import Stats from "./Stats";
import Navbar from "./Navbar";
import Body from "./Body";

export default function Routes() {
  return (
    <>
      <Switch>
        {/* <Route render={() => <Navbar />} /> */}
        <Route exact path="/" render={() => <Signin />} />
        <Route path="/home" render={() => <Body />} />
        <Route path="/signup" render={() => <Signup />} />
        <Route path="/transactions" render={() => <Transactions />} />
        <Route path="/settings" render={() => <Settings />} />
        <Route path="/stats" render={() => <Stats />} />
      </Switch>
    </>
  );
}
