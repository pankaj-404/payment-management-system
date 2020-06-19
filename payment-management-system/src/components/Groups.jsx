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
        <div
          style={{
            fontFamily: "Arial Black, Gadget, sans-serif",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            minHeight: 620,
          }}
        >
          {currentUser && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                fontFamily: "Lucida Console, Monaco, monospace",
              }}
            >
              <div
                style={{
                  fontSize: "25px",
                  margin: "20px",
                  fontWeight: "bolder",
                }}
              >
                Total Expense : RS. {usersData[currentUser]["totalExpense"]}
              </div>

              <div
                style={{
                  fontSize: "25px",
                  margin: "20px",
                  fontWeight: "bolder",
                }}
              >
                You Borrowed : RS. {usersData[currentUser]["youBorrowed"]}
              </div>

              <div
                style={{
                  fontSize: "25px",
                  margin: "20px",
                  fontWeight: "bolder",
                }}
              >
                You Lent : Rs. {usersData[currentUser]["youLent"]}
              </div>
            </div>
          )}
          {currentUser && (
            <div
              style={{
                fontSize: "25px",
                margin: "20px",
                fontWeight: "bolder",
              }}
            >
              <p style={{ fontSize: "30px", marginTop: 10 }}>
                Welcome to PaymentZ
              </p>
              <p style={{ fontSize: "20px", marginTop: 10 }}>
                <Link to="/addGroup"> Click Here </Link>
                to Add Group
              </p>
            </div>
          )}
          {currentUser &&
            Object.keys(usersData).length > 0 &&
            usersData[currentUser]["groups"] &&
            Object.keys(usersData[currentUser]["groups"]).length > 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  border: "1px solid azure",
                  padding: 30,
                  width: 400,
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
                            ADD EXPENSE
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
