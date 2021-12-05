import React from "react";

const userDetailData = [
  {
    id: 100,
    name: "Mohit",
    experience: "4yrs",
  },
  {
    id: 101,
    name: "Rohit",
    experience: "14yrs",
  },
  {
    id: 103,
    name: "Ruhit",
    experience: "40yrs",
  },
  {
    id: 104,
    name: "Mohesh",
    experience: "3yrs",
  },
];

const userReportData = [
  {
    id: 100,
    name: "Mohit",
    report: "Passed",
    chart: "Given",
  },
  {
    id: 101,
    name: "Rohit",
    report: "failed",
    chart: "Not Prepared",
  },
  {
    id: 103,
    name: "Ruhit",
    report: "Promoted",
    chart: "Preparing",
  },
  {
    id: 104,
    name: "Mohesh",
    report: "Passed",
    chart: "Given",
  },
];

export default class CustomHOCExample extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div>
          <mark style={{ fontSize: "40px", color: "red", margin: "24px" }}>
            Higher Order Component Example
          </mark>
          <hr></hr>
          <div>User Details</div>
          <UserDetails />
          <br></br>
          <br></br>
          <div>User Report Details</div>
          <UserReportDetails />
          <hr></hr>
        </div>
      </>
    );
  }
}

const UserDetails = createHigherOrderComponent(InputComponent, {
  header: ["id", "name", "experience"],
  data: userDetailData,
});
const UserReportDetails = createHigherOrderComponent(InputComponent, {
  header: ["id", "name", "report", "chart"],
  data: userReportData,
});

function InputComponent({ inputData }) {
  return (
    <table style={{ border: "1px solid black", marginLeft: "16px" }}>
      <thead>
        <tr style={{ padding: "16px", float: "left" }}>
          {inputData.header.map((head) => (
            <th key={head}>{head.toUpperCase()}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        <tr style={{ padding: "16px", float: "left" }}>
          {inputData.data.map((item, index) => (
            <th key={index}>{item[inputData.header[index]]}</th>
          ))}
        </tr>
      </tbody>
    </table>
  );
}
function createHigherOrderComponent(InputComponent, inputData) {
  return function () {
    return <InputComponent inputData={inputData} />;
  };
}
