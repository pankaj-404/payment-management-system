import React from "react";
import { Route, Switch } from "react-router-dom";
import Signin from "./Signin";
import Signup from "./Signup";
import Transactions from "./Transactions";
import Settings from "./Settings";
import Stats from "./Stats";
import Navbar from "./Navbar";
import Body from "./Body";
import GroupDetails from "./GroupDetails";
import AddExpense from "./AddExpense";

export default function Routes() {
  return (
    <>
      <Switch>
        {/* <Route render={() => <Navbar />} /> */}
        <Route exact path="/" render={(props) => <Signin {...props} />} />
        <Route path="/home" render={(props) => <Body {...props} />} />
        <Route path="/signup" render={(props) => <Signup {...props} />} />
        <Route
          exact
          path="/addGroup"
          render={(props) => <GroupDetails {...props} />}
        />
        <Route
          path="/transactions"
          render={(props) => <Transactions {...props} />}
        />
        <Route
          path="/addexpense/:id"
          render={(props) => <AddExpense {...props} />}
        />
        <Route path="/settings" render={(props) => <Settings {...props} />} />
        <Route path="/stats" render={() => <Stats />} />
      </Switch>
    </>
  );
}
