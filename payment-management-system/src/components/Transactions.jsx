import React from "react";
import { Link, Router } from "react-router-dom";
import { addGroup, selectGroup } from "../redux/action";
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
    const { categories, usersData, currentUser, selectGroup } = this.props;
    return (
      <>
        <div>
          Welcome to App Click on ADD for creating GROUP{" "}
          {<Link to="/addGroup">ADD</Link>}
          {Object.keys(usersData).length > 0 &&
            usersData[currentUser]["groups"] &&
            Object.keys(usersData[currentUser]["groups"]).length > 0 && (
              <div
                style={{
                  margin: "0 0 0 35%",
                  // textAlign: "center",
                }}
              >
                {Object.keys(usersData[currentUser]["groups"]).map((group) => (
                  <tr>
                    <td>
                      {usersData[currentUser]["groups"][group]["groupName"]}
                    </td>
                    <td>
                      <Link to={`/addexpense/${group}`}>
                        <button
                          id={group}
                          onClick={(e) => selectGroup(e.target.id)}
                        >
                          Add Expense
                        </button>
                      </Link>
                      <button
                        id={group}
                        onClick={(e) => console.log(e.target.id)}
                      >
                        Delete group
                      </button>
                    </td>
                  </tr>
                ))}
              </div>
            )}
          <br />
          {usersData[currentUser]["expenses"] && (
            <table style={{ borderCollapse: "collapse", width: "100%" }}>
              <tr style={{ border: "1px solid black", height: 30 }}>
                <td>DATE</td>
                <td>AMOUNT</td>
                <td>CATEGORY</td>
                <td>GROUP</td>
                <td>YOUR SHARE</td>
                <td>PAID BY</td>
                <td>STATUS</td>
                <td>ACTIONS</td>
              </tr>

              <tbody>
                {usersData[currentUser]["expenses"].map((expense) => (
                  <tr style={{ border: "1px solid black", height: 20 }}>
                    <td>{expense.timeStamp}</td>
                    <td>{expense.amount}</td>
                    <td>{expense.category}</td>
                    <td>{expense.groupName}</td>
                    <td>{expense.userShare}</td>
                    <td>{expense.paidBy}</td>
                    <td>{expense.isSettled ? "Done" : "Pending"}</td>
                    {!expense.isSettled &&
                      expense.paidBy !== usersData[currentUser]["name"] && (
                        <td>
                          <button id={expense.groupId} name={expense.timeStamp}>
                            Pay
                          </button>
                        </td>
                      )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
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
  selectGroup: (payload) => dispatch(selectGroup(payload)),
});

export default connect(mapStasteToProps, mapDispatchToProps)(Transactions);
