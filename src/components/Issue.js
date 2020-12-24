import React, { useState } from "react";
import Label from "./label";

import "./Issue.css";
import Avatar from "./Avatar";

const Issue = (props) => {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <a
      href="/#"
      className="issue"
      onClick={(e) => setShowDescription((prev) => !prev)}
    >
      <div className="issue__content">
        <div className="issue__image">
          <Avatar title={props.user} image={props.avatar} alt={props.user} />
        </div>
        <h4 className="issue__title">
          {props.title}{" "}
          {props.labels.map((l) => (
            <Label key={l.name} {...l} title={l.name} />
          ))}
        </h4>
      </div>
      <div className="issue__info">
        {showDescription && <p>{props.description}</p>}
      </div>
    </a>
  );
};

export default Issue;
