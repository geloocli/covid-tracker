import React from "react";
import "./suggested-list.style.scss";

const SuggestedList = ({ children, clickHandler }) => {
  return (
    <React.Fragment>
      <li onClick={clickHandler}>{children}</li>
    </React.Fragment>
  );
};

export default SuggestedList;
