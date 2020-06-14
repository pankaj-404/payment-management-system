import React from "react";
import Chart from "react-google-charts";
import { connect } from "react-redux";

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

  // console.log(months);

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
    // console.log(months[month], "handle");
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
      <>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <select onChange={(e) => this.handleChange(e)}>
            <option>Select Month</option>
            <option value="jan">jan</option>
            <option value="feb">feb</option>
            <option value="mar">mar</option>
            <option value="april">april</option>
            <option value="may">may</option>
            <option value="june">june</option>
            <option value="july">july</option>
            <option value="aug">aug</option>
            <option value="sep">sep</option>
            <option value="oct">oct</option>
            <option value="nov">nov</option>
            <option value="dec">dec</option>
          </select>
        </div>
        <div style={{ display: "flex" }}>
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
      </>
    );
  }
}

const mapStasteToProps = (state) => ({
  usersData: state.users,
  currentUser: state.currentUser,
});

export default connect(mapStasteToProps)(Stats);
