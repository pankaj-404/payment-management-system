import React from "react";
import { Link, Router, Redirect, useHistory } from "react-router-dom";
import { addExpense } from "../redux/action";
import { connect } from "react-redux";

class AddExpense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      category: "",
      currentGroup: "",
      timeStamp: "",
    };
  }

  handleChange = (e) => {
    const { id } = this.props.match.params;
    const time = new Date().toLocaleString();
    console.log(time, "addExpannse");

    // console.log(this.props);
    this.setState({
      [e.target.name]: e.target.value,
      currentGroup: id,
      timeStamp: time,
    });
  };

  handleClick = (payload) => {
    const { amount, category, currentGroup } = this.state;
    const { usersData, history, addExpense, currentGroupMembers } = this.props;
    amount &&
      category &&
      currentGroup &&
      currentGroupMembers.map((member) =>
        addExpense({ ...payload, member: member })
      ) &&
      history.push("/transactions");
  };

  render() {
    const { amount, category, currentGroup } = this.state;
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
});

const mapDispatchToProps = (dispatch) => ({
  addExpense: (payload) => dispatch(addExpense(payload)),
});

export default connect(mapStasteToProps, mapDispatchToProps)(AddExpense);
