import React from "react";

import Issue from "./Issue";

import "./Issues.css";
const Issues = (props) => {
  if (!props.issues || props.issues.length === 0) {
    return <h3>Search Issues...</h3>;
  }
  return (
    <ul className="issues">
      {props.issues.map((issue) => (
        <Issue {...issue}></Issue>
      ))}
    </ul>
  );
};
export default Issues;
