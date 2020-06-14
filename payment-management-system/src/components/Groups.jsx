import React from "react";
import { Link, Router } from "react-router-dom";
import { addGroup, selectGroup, deleteGroup } from "../redux/action";
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

  handleDelete(e, payload) {
    const {
      currentGroupMembers,
      selectGroup,
      deleteGroup,
      currentUser,
      usersData,
    } = this.props;
    const group = usersData[currentUser]["groups"][e.target.id]["members"];
    selectGroup(e.target.id);
    group.map((ele) =>
      deleteGroup({ ...payload, member: ele, groupId: e.target.id })
    );
  }

  render() {
    const { handleInput } = this;
    const { category, amount, customCategory } = this.state;
    const {
      categories,
      usersData,
      currentUser,
      selectGroup,
      deleteGroup,
    } = this.props;
    return (
      <>
        <div>
          {currentUser && (
            <div>
              Total Expense : RS. {usersData[currentUser]["totalExpense"]}
              <br />
              You Borrowed : RS. {usersData[currentUser]["youBorrowed"]}
              <br />
              You Lent : Rs. {usersData[currentUser]["youLent"]}
            </div>
          )}
          {currentUser && (
            <div>
              Welcome to App Click on ADD for creating GROUP
              <Link to="/addGroup">ADD</Link>
            </div>
          )}
          {currentUser &&
            Object.keys(usersData).length > 0 &&
            usersData[currentUser]["groups"] &&
            Object.keys(usersData[currentUser]["groups"]).length > 0 && (
              <div
                style={{
                  margin: "0 0 0 35%",
                  // textAlign: "center",
                }}
              >
                {Object.keys(usersData[currentUser]["groups"]).map((group) =>
                  group != null ? (
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
                            +
                          </button>
                        </Link>
                        <button
                          id={group}
                          onClick={(e) => this.handleDelete(e)}
                        >
                          del group
                        </button>
                      </td>
                    </tr>
                  ) : (
                    ""
                  )
                )}
              </div>
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
  currentGroupMembers: state.currentGroupMembers,
});

const mapDispatchToProps = (dispatch) => ({
  addGroup: (payload) => dispatch(addGroup(payload)),
  selectGroup: (payload) => dispatch(selectGroup(payload)),
  deleteGroup: (payload) => dispatch(deleteGroup(payload)),
});

export default connect(mapStasteToProps, mapDispatchToProps)(Transactions);
