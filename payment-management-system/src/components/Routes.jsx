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
import Groups from "./Groups";
import { connect } from "react-redux";
import LangingPage from "../components/LandingPage";
function Routes(props) {
  const { isSignin, currentUser } = props;

  return (
    <>
      <Switch>
        <Route exact path="/" render={() => <LangingPage />} />
        <Route path="/signin" render={(props) => <Signin {...props} />} />
        {/* <Route path="/home" render={(props) => <Body {...props} />} /> */}
        <Route path="/signup" render={(props) => <Signup {...props} />} />
        {currentUser !== "" ? (
          <>
            <Route render={(props) => <Navbar {...props} />} />
            <Route path="/home" render={() => <Groups />} />
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
            <Route
              path="/settings"
              render={(props) => <Settings {...props} />}
            />
            <Route path="/stats" render={() => <Stats />} />
          </>
        ) : (
          ""
        )}
      </Switch>
    </>
  );
}

const mapStasteToProps = (state) => ({
  isSignin: state.isSignin,
  currentUser: state.currentUser,
});

// const mapDispatchToProps = (dispatch) => ({
//   logout: (payload) => dispatch(logout(payload)),
//   signin: (payload) => dispatch(signin(payload)),
//   signup: (payload) => dispatch(signup(payload)),
// });

export default connect(mapStasteToProps, null)(Routes);
