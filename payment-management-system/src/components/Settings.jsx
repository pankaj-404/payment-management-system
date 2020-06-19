import React from "react";
import { Link, Router } from "react-router-dom";
import { addGroup, selectGroup, deleteGroup } from "../redux/action";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";

class Settings extends React.Component {
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

  handleDelete(id, payload) {
    const {
      currentGroupMembers,
      selectGroup,
      deleteGroup,
      currentUser,
      usersData,
    } = this.props;
    const group = usersData[currentUser]["groups"][id]["members"];
    selectGroup(id);
    group.map((ele) => deleteGroup({ ...payload, member: ele, groupId: id }));
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
      <div
        style={{
          minHeight: 620,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div>
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

                      <Button
                        variant="contained"
                        color="secondary"
                        id={group}
                        onClick={() => {
                          this.handleDelete(group);
                        }}
                      >
                        Delete group
                      </Button>
                    </tr>
                  ) : (
                    ""
                  )
                )}
              </div>
            )}
        </div>
      </div>
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

export default connect(mapStasteToProps, mapDispatchToProps)(Settings);
