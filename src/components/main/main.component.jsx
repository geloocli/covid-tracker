import React from "react";
import { isoLower } from "./iso-codes";
import "./main.style.scss";
import angel from "../../assets/angel.png";
import leaf from "../../assets/leaf.png";
import bacteria from "../../assets/bacteria.png";

const Main = ({ selected }) => {
  const {
    totalConfirmed,
    currentCountry,
    totalRecovered,
    totalDeaths
  } = selected;

  return (
    <div className="main">
      <div className="country">
        <img
          src={`https://www.countryflags.io/${
            isoLower[currentCountry.toLowerCase()]
          }/shiny/64.png`}
          alt={currentCountry}
        />
        <h1>{currentCountry}</h1>
      </div>

      <div className="contents">
        <div className="content">
          <img src={bacteria} alt="bacteria" />
          <h3>Total Cases : {totalConfirmed}</h3>
        </div>

        <div className="content">
          <img src={leaf} alt="leaf" />
          <h3>Total Recovered: {totalRecovered}</h3>
        </div>
        <div className="content">
          <img src={angel} alt="recovered" />
          <h3>Total Deaths: {totalDeaths}</h3>
        </div>
      </div>
    </div>
  );
};

export default Main;
