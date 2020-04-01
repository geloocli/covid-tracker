import React from "react";
import "./input.style.scss";

const Input = ({ changeHandler, ...otherProps }) => {
  return (
    <div className="input-group">
      <input onChange={e => changeHandler(e)} {...otherProps} />
    </div>
  );
};

export default Input;
