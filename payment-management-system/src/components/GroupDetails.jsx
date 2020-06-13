import React from "react";
import { Link, Router } from "react-router-dom";
import { addGroup } from "../redux/action";
import { connect } from "react-redux";

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
    this.setState({
      users: [...users, email],
      email: "",
    });
  };

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  validation = (payload) => {
    const { usersData, addGroup, history } = this.props;
    const { email, users, groupName } = this.state;

    // usersData.hasOwnProperty(email) &&
    users &&
      groupName &&
      users.map((member) => addGroup({ ...payload, member: member }));
    history.push("/transactions");
  };

  render() {
    const { handleInput, handleAdd, validation } = this;
    const { users, email, groupName } = this.state;
    return (
      <>
        <div>
          <input
            type="text"
            name="groupName"
            value={groupName}
            onChange={(e) => handleInput(e)}
            placeholder="Group Name"
          />
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              handleInput(e);
            }}
            placeholder="email"
          />
          <button onClick={(e) => handleAdd(e)}>Add</button>
          {/* <Link to="/transactions"> */}
          <button onClick={() => validation(this.state)}>Done</button>
          {/* </Link> */}
          {users.length > 1 && (
            <>
              <div>GROUP NAME :{" " + groupName}</div>
              <div style={{ margin: "20px 0 0 0", textAlign: "center" }}>
                USERS:
                <br />
                {users.map((user, i) => (
                  <div style={{ margin: "5px 0 0 0", textAlign: "center" }}>
                    {i + 1 + " "}
                    {user}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </>
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
