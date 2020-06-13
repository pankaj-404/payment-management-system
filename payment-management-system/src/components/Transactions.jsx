import React from "react";
import { Link, Router } from "react-router-dom";
import { addGroup } from "../redux/action";
import { connect } from "react-redux";

class Transactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      amount: 0,
      customCategory: "",
    };
  }

  // handleAdd = (e) => {
  //   const { email, users } = this.state;
  //   this.setState({
  //     users: [...users, email],
  //     email: "",
  //   });
  // };

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  // validation = (payload) => {
  //   const { usersData, addGroup, history } = this.props;
  //   const { email, users, groupName } = this.state;

  //   // usersData.hasOwnProperty(email) &&
  //   users &&
  //     groupName &&
  //     users.map((member) => addGroup({ ...payload, member: member }));
  //   history.push("/transactions");
  // };

  render() {
    const { handleInput } = this;
    const { category, amount, customCategory } = this.state;
    const { categories, usersData, currentUser } = this.props;
    return (
      <>
        <div>
          Welcome to App Click on ADD for creating GROUP{" "}
          {<Link to="/addGroup">ADD</Link>}
          {Object.keys(usersData).length > 0 &&
            usersData[currentUser]["groups"] &&
            Object.keys(usersData[currentUser]["groups"]).length > 0 &&
            Object.keys(usersData[currentUser]["groups"]).map((group) => (
              <tr>
                <td>{usersData[currentUser]["groups"][group]["groupName"]}</td>
                <td>
                  <button id={group} onClick={(e) => console.log(e.target.id)}>
                    Add Expense
                  </button>{" "}
                  <button id={group} onClick={(e) => console.log(e.target.id)}>
                    Delete group
                  </button>
                </td>
              </tr>
            ))}
        </div>
      </>
    );
  }
}

const mapStasteToProps = (state) => ({
  usersData: state.users,
  categories: state.categories,
  currentUser: state.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  addGroup: (payload) => dispatch(addGroup(payload)),
});

export default connect(mapStasteToProps, mapDispatchToProps)(Transactions);
