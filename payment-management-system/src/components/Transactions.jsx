import React from "react";
import { Link, Router } from "react-router-dom";
import {
  addGroup,
  selectGroup,
  settlePending,
  updateBorrowed,
  updateLent,
  updateExpense,
  addExpense,
  // selectGroup,
} from "../redux/action";
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
  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handlePay = (e, payload) => {
    const {
      usersData,
      addGroup,
      history,
      settlePending,
      currentUser,
      updateBorrowed,
      updateLent,
      updateExpense,
      addExpense,
      selectGroup,
    } = this.props;
    const { email, users, groupName } = this.state;
    const month =
      new Date().getMonth() + 1 < 10
        ? "0" + (new Date().getMonth() + 1)
        : new Date().getMonth() + 1;
    console.log(payload.groupId, "payloadGroupId");
    selectGroup(payload.groupId);

    addExpense({
      ...payload,
      timeStamp: ` ${new Date().getFullYear()}-${month}-${new Date().getDate()}`,
      member: currentUser,
      type: "Paid",
      isSettled: !payload.isSettled,
    });
    updateBorrowed({
      ...payload,
      member: currentUser,
      share: -Number(payload.userShare),
    });
    updateExpense({
      ...payload,
      currentUser: currentUser,
      share: Number(payload.userShare),
    }) &&
      // updateExpense({ ...payload, share: payload.userShare }) &&
      addExpense({
        ...payload,
        timeStamp: ` ${new Date().getFullYear()}-${month}-${new Date().getDate()}`,
        member: payload.paidById.toString(),
        type: "Rceived",
        isSettled: !payload.isSettled,
      }) &&
      updateLent({
        ...payload,
        member: payload.paidById,
        share: -Number(payload.userShare),
      });
    updateExpense({
      ...payload,
      currentUser: payload.paidById,
      share: -Number(payload.userShare),
    });
    settlePending({ ...payload, member: currentUser, index: e.target.id });
  };

  render() {
    const { handleInput } = this;
    const { category, amount, customCategory } = this.state;
    const { categories, usersData, currentUser } = this.props;
    return (
      <>
        <div style={{ minHeight: 600 }}>
          {currentUser && usersData[currentUser]["expenses"] && (
            <table style={{ borderCollapse: "collapse", width: "100%" }}>
              <tr
                style={{
                  border: "1px solid black",
                  height: 40,
                  fontSize: 20,
                  fontWeight: "bolder",
                }}
              >
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
                {usersData[currentUser]["expenses"].map((expense, i) => (
                  <tr style={{ border: "1px solid black", height: 30 }}>
                    <td>{expense.timeStamp}</td>
                    <td>{expense.amount}</td>
                    <td>{expense.category}</td>
                    <td>{expense.groupName}</td>
                    <td>{expense.userShare}</td>
                    <td>{expense.paidBy}</td>
                    {/* <td>{expense.isSettled ? "Done" : "Pending"}</td> */}
                    <td>{expense.type}</td>

                    {!expense.isSettled &&
                      expense.paidBy !== usersData[currentUser]["name"] && (
                        <td>
                          <button
                            id={i}
                            name={expense.groupId}
                            onClick={(e) => this.handlePay(e, expense)}
                          >
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
// updateBorrowed,updateLent,updateExpense
const mapDispatchToProps = (dispatch) => ({
  addGroup: (payload) => dispatch(addGroup(payload)),
  selectGroup: (payload) => dispatch(selectGroup(payload)),
  settlePending: (payload) => dispatch(settlePending(payload)),
  updateBorrowed: (payload) => dispatch(updateBorrowed(payload)),
  updateLent: (payload) => dispatch(updateLent(payload)),
  updateExpense: (payload) => dispatch(updateExpense(payload)),
  addExpense: (payload) => dispatch(addExpense(payload)),
  selectGroup: (payload) => dispatch(selectGroup(payload)),
});

export default connect(mapStasteToProps, mapDispatchToProps)(Transactions);
