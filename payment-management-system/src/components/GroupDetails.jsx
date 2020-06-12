import React from "react";
import { Link } from "react-router-dom";

export default class GroupDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
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

  render() {
    const { handleInput, handleAdd } = this;
    const { users, email, groupName } = this.state;
    return (
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
        <Link to="/transactions">
          <button onClick={() => console.log(this.state)}>Done</button>
        </Link>
        {users.length > 0 && (
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
    );
  }
}
