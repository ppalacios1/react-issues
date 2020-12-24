import React from "react";

import "./Label.css";

const Label = (props) => {
  return (
    <span className="label" style={{ backgroundColor: "#" + props.color }}>
      {props.name}
    </span>
  );
};

export default Label;
