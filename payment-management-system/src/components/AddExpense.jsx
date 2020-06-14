import React from "react";
import { Link, Router, Redirect, useHistory } from "react-router-dom";
import {
  addExpense,
  updateBorrowed,
  updateLent,
  updateExpense,
} from "../redux/action";
import { connect } from "react-redux";

class AddExpense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      category: "Food",
      currentGroup: "",
      timeStamp: "",
    };
  }

  handleChange = (e) => {
    const { id } = this.props.match.params;
    const time = new Date().toLocaleString();
    // console.log(e.target.name, e.target.value, "addExpannse");

    // console.log(this.props);
    this.setState({
      [e.target.name]: e.target.value,
      currentGroup: id,
      // timeStamp: time,
    });
  };

  handleClick = (payload) => {
    const { amount, category, currentGroup, timeStamp } = this.state;
    const {
      usersData,
      history,
      addExpense,
      currentGroupMembers,
      updateBorrowed,
      updateLent,
      updateExpense,
      currentUser,
    } = this.props;
    const share = Number(amount) / currentGroupMembers.length;
    // console.log(share);
    amount &&
      category &&
      timeStamp &&
      currentGroup &&
      currentGroupMembers.map((member) =>
        member.toString() != currentUser.toString()
          ? addExpense({
              ...payload,
              member: member,
              type: "Borrowed",
              isSettled: false,
            }) && updateBorrowed({ ...payload, member: member, share: share })
          : addExpense({
              ...payload,
              member: member,
              type: "Lent",
              isSettled: false,
            }) &&
            updateLent({ ...payload, member: member, share: amount - share })
      ) &&
      updateExpense({ ...payload, share: amount, currentUser: currentUser }) &&
      history.push("/transactions");
  };

  render() {
    const { amount, category, currentGroup, timeStamp } = this.state;
    const { categories, addExpense } = this.props;
    const { handleClick } = this;
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
        AddExpense
        <br />
        <label>
          date
          <input
            onChange={(e) => this.handleChange(e)}
            value={timeStamp}
            type="date"
            name="timeStamp"
            placeholder="date"
          />
        </label>
        <label>
          amount
          <input
            onChange={(e) => this.handleChange(e)}
            value={amount}
            type="number"
            name="amount"
            placeholder="amount"
          />
        </label>
        <label>
          Email
          <select
            onChange={(e) => this.handleChange(e)}
            value={category}
            type="text"
            name="category"
            placeholder="categories"
          >
            {categories.map((category) => (
              <option value={category}> {category}</option>
            ))}
          </select>
        </label>
        <button
          onClick={() => {
            handleClick(this.state);
          }}
        >
          Add Expense
        </button>
      </div>
    );
  }
}

const mapStasteToProps = (state) => ({
  usersData: state.users,
  categories: state.categories,
  currentGroupMembers: state.currentGroupMembers,
  currentUser: state.currentUser,
  // updateExpense: state.updateExpense,
});

const mapDispatchToProps = (dispatch) => ({
  addExpense: (payload) => dispatch(addExpense(payload)),
  updateBorrowed: (payload) => dispatch(updateBorrowed(payload)),
  updateLent: (payload) => dispatch(updateLent(payload)),
  updateExpense: (payload) => dispatch(updateExpense(payload)),
});

export default connect(mapStasteToProps, mapDispatchToProps)(AddExpense);
