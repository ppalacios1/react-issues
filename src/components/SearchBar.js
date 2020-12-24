import React, { useEffect, useRef, useState } from "react";
import Autocomplete from "react-autocomplete";
import { Hint } from "react-autocomplete-hint";

import "./SearchBar.css";
// import Suggestions from "./Suggestions";

const SearchBar = (props) => {
  const [value, setValue] = useState("");
  let inputRef = useRef();
  const [res, setRes] = useState([]);

  // const updateSearch = (selected) => {
  //   inputRef.current.value = selected;
  //   inputRef.current.focus();
  //   props.search(selected);
  //   setRes([]);
  // };

  const getInfo = async () => {
    let url = new URL("https://api.github.com/search/issues");
    url.searchParams.append(
      "q",
      "org:facebook repo:react " + value + " in:title"
    );
    const res = await fetch(url);
    const resData = await res.json();
    const formatedData = resData.items.map((issue) => {
      return { id: issue.id, title: issue.title };
    });
    setRes(formatedData);
  };
  const changeHandler = (e) => {
    const val = e.target.value;
    setValue(val);
    if (val && val.length > 1) {
      if (val.length % 5 === 0) {
        getInfo();
      }
    } else if (!val) {
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    props.search(value);
  };

  const keyUpHandler = (e) => {
    if (inputRef.current.value && e.key === "Enter") {
      props.search(inputRef.current.value);
    }
  };

  return (
    <form className="search-bar" onSubmit={submitHandler}>
      <div className="form-control">
        <Autocomplete
          renderInput={(props) => {
            return <input {...props} placeholder="Search Issue..." />;
          }}
          getItemValue={(item) => item.title}
          items={res}
          renderItem={(item, isHighlighted) => (
            <div
              className="suggestion"
              key={item.id}
              style={{ background: isHighlighted ? "lightgray" : "white" }}
            >
              {item.title}
            </div>
          )}
          value={value}
          onChange={changeHandler}
          onSelect={(val) => setValue(val)}
        />
        {/* <Hint options={res}>
          <input
            disabled={props.disabled}
            placeholder="Search for..."
            ref={inputRef}
            onChange={changeHandler}
            onKeyUp={keyUpHandler}
          />
        </Hint> */}
        {/* {res.length > 0 && (
          <Suggestions results={res} updateSearch={updateSearch} />
        )} */}
      </div>
    </form>
  );
};

export default SearchBar;
