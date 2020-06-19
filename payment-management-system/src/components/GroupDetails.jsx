import React from "react";
import { Link, Router } from "react-router-dom";
import { addGroup } from "../redux/action";
import { connect } from "react-redux";
import { TextField, Button } from "@material-ui/core";

class GroupDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [this.props.currentUser],
      email: "",
      groupName: "",
    };
  }

  handleAdd = (e) => {
    const { email, users } = this.state;
    const { usersData } = this.props;
    usersData.hasOwnProperty(this.state.email)
      ? this.setState({
          users: [...users, email],
          email: "",
        })
      : alert(this.state.email + " is not an valid user");
  };

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  validation = (payload) => {
    const { usersData, addGroup, history } = this.props;
    const { email, users, groupName } = this.state;
    let groupId = new Date().getTime();

    users.length > 1 &&
      groupName &&
      users.map((member) =>
        addGroup({ ...payload, groupId: groupId, member: member })
      );
    history.push("/home");
  };

  render() {
    const { handleInput, handleAdd, validation } = this;
    const { users, email, groupName } = this.state;
    return (
      <div
        style={{
          minHeight: 620,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          color: "black",
        }}
      >
        <div
          style={{
            border: "1px solid white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "400px",
            textAlign: "center",
            padding: 10,
            background: "white",
            color: "black",
          }}
        >
          <TextField
            type="text"
            name="groupName"
            value={groupName}
            onChange={(e) => handleInput(e)}
            label="Group Name"
          />
          <TextField
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              handleInput(e);
            }}
            label="email"
          />
          <div style={{ margin: 10 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => handleAdd(e)}
            >
              Add
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => validation(this.state)}
            >
              Done
            </Button>
          </div>
          {users.length > 1 && (
            <div style={{ color: "black" }}>
              <div>GROUP NAME :{" " + groupName}</div>
              <div
                style={{
                  margin: "20px 0 0 0",
                  textAlign: "center",
                  color: "black",
                }}
              >
                USERS:
                <br />
                {users.map((user, i) => (
                  <div
                    style={{
                      margin: "5px 0 0 0",
                      textAlign: "center",
                      color: "black",
                    }}
                  >
                    {i + 1 + " "}
                    {user}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStasteToProps = (state) => ({
  usersData: state.users,
  currentUser: state.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  addGroup: (payload) => dispatch(addGroup(payload)),
});

export default connect(mapStasteToProps, mapDispatchToProps)(GroupDetails);
