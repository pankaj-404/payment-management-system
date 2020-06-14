import React from "react";
import { Link, Router } from "react-router-dom";
import { addGroup, selectGroup, deleteGroup } from "../redux/action";
import { connect } from "react-redux";

class Groups extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { categories, usersData, currentUser, selectGroup } = this.props;
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

export default connect(mapStasteToProps, mapDispatchToProps)(Groups);
