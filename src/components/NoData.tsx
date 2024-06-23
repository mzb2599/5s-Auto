import React from "react";
import "./NoData.css";
const NoDataComponent = (props) => {
  return (
    <div className="container">
      <div className="centered-text">
        <h1>{props.data}</h1>
        <p>{props.children}</p>
      </div>
    </div>
  );
};

export default NoDataComponent;
