import React from "react";
import SuggestedList from "./suggested-list/suggested-list.component";
import "./suggested-lists.style.scss";

const SuggestedLists = ({ suggestedCountry, clickHandler }) => {
  return (
    <ul className="ul">
      {suggestedCountry.map((country, index) => {
        return (
          <SuggestedList clickHandler={() => clickHandler(country)} key={index}>
            {country}
          </SuggestedList>
        );
      })}
    </ul>
  );
};

export default SuggestedLists;
