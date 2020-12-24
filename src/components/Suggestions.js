import React from "react";

import "./Suggestions.css";

const Suggestions = (props) => {
  const options = props.results.map((r) => (
    <li
      onClick={() => {
        props.updateSearch(r.title);
      }}
      key={r.key}
    >
      {r.title}
    </li>
  ));
  return <ul className="suggestions">{options}</ul>;
};

export default Suggestions;
