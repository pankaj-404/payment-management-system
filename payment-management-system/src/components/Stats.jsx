import React from "react";
import Chart from "react-google-charts";
import { connect } from "react-redux";
import { Select, MenuItem, FormControl, InputLabel } from "@material-ui/core";

class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Food: 0,
      Apparel: 0,
      Health: 0,
      Education: 0,
      Transportation: 0,
      Household: 0,
      Investment: 0,
      Others: 0,
      month: "",
    };
  }

  handleChange = (e) => {
    const { usersData, currentUser } = this.props;
    let months = {
      jan: [],
      feb: [],
      mar: [],
      april: [],
      may: [],
      june: [],
      july: [],
      aug: [],
      sep: [],
      oct: [],
      nov: [],
      dec: [],
    };

    usersData[currentUser]["expenses"].map((ele) => {
      switch (ele.timeStamp.split("-")[1]) {
        case "01":
          months.jan.push(ele);
          break;
        case "02":
          months.feb.push(ele);
          break;
        case "03":
          months.mar.push(ele);
          break;
        case "04":
          months.april.push(ele);
          break;
        case "05":
          months.may.push(ele);
          break;
        case "06":
          months.june.push(ele);
          break;
        case "07":
          months.july.push(ele);
          break;
        case "08":
          months.aug.push(ele);
          break;
        case "09":
          months.sep.push(ele);
          break;
        case "10":
          months.oct.push(ele);
          break;
        case "11":
          months.nov.push(ele);
          break;
        case "12":
          months.dec.push(ele);
          break;
        default:
          break;
      }
    });
    const temp = e !== null ? e.target.value : "june";
    this.setState({
      month: temp,
    });
    months[temp].map((ele) => {
      if (ele.type !== "Settlement")
        switch (ele["category"]) {
          case "Food":
            this.setState({
              Food: (this.state.Food += ele["userShare"]),
            });
            break;
          case "Apparel":
            this.setState({
              Apparel: (this.state.Apparel += ele["userShare"]),
            });
            break;
          case "Health":
            this.setState({
              Health: (this.state.Health += ele["userShare"]),
            });
            break;
          case "Education":
            this.setState({
              Education: (this.state.Education += ele["userShare"]),
            });
            break;
          case "Transportation":
            this.setState({
              Transportation: (this.state.Transportation += ele["userShare"]),
            });
            break;
          case "Household":
            this.setState({
              Household: (this.state.Household += ele["userShare"]),
            });
            break;
          case "Investment":
            this.setState({
              Investment: (this.state.Investment += ele["userShare"]),
            });
            break;
          case "Others":
            this.setState({
              Others: (this.state.Others += ele["userShare"]),
            });
            break;
          default:
            this.setState({
              Others: (this.state.Others += ele["userShare"]),
            });
            break;
        }
    });
  };

  render() {
    const {
      Food,
      Apparel,
      Health,
      Others,
      Transportation,
      Education,
      Investment,
      Household,
      month,
    } = this.state;
    return (
      <div
        style={{
          minHeight: 620,
          color: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <FormControl>
            <InputLabel>Select Month</InputLabel>
            <Select
              onChange={(e) => this.handleChange(e)}
              variant="outlined"
              value={month}
              placeholder="Mpnths"
              type="text"
              name="month"
              style={{ width: 100, background: "white" }}
            >
              <MenuItem selected={"jan"} value="jan">
                jan
              </MenuItem>
              <MenuItem value="feb">feb</MenuItem>
              <MenuItem value="mar">mar</MenuItem>
              <MenuItem value="april">april</MenuItem>
              <MenuItem value="may">may</MenuItem>
              <MenuItem value="june">june</MenuItem>
              <MenuItem value="july">july</MenuItem>
              <MenuItem value="aug">aug</MenuItem>
              <MenuItem value="sep">sep</MenuItem>
              <MenuItem value="oct">oct</MenuItem>
              <MenuItem value="nov">nov</MenuItem>
              <MenuItem value="dec">dec</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {month && (
            <Chart
              width={"500px"}
              height={"300px"}
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={[
                ["Caregorie", "Expenses per month"],
                ["Food", Food],
                ["Apparel", Apparel],
                ["Education", Education],
                ["Health", Health],
                ["Transportation", Transportation],
                ["Household", Household],
                ["Investment", Investment],
                ["Others", Others],
              ]}
              options={{
                title: `${month} Month Expenses`,
              }}
            />
          )}
          {month && (
            <Chart
              width={"500px"}
              height={"300px"}
              chartType="BarChart"
              loader={<div>Loading Chart</div>}
              data={[
                ["Caregorie", "Expenses per month"],
                ["Food", Food],
                ["Apparel", Apparel],
                ["Education", Education],
                ["Health", Health],
                ["Transportation", Transportation],
                ["Household", Household],
                ["Investment", Investment],
                ["Others", Others],
              ]}
              options={{
                title: `${month} Month Expenses`,
              }}
            />
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

export default connect(mapStasteToProps)(Stats);
