import React, { Component } from "react";
import Input from "./components/input/input.component";
import SuggestedLists from "./components/suggested-lists/suggested-lists.component";
import Main from "./components/main/main.component";

import "./app.style.scss";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      datas: {},
      userInput: "",
      suggestedCountry: [],
      selected: {},
      overAll: {}
    };
  }

  reducer = (data, option) => {
    return data.reduce((accu, curr) => {
      return accu[option] > curr[option] ? accu[option] : curr[option];
    });
  };

  reducerv = (accu, curr, option) => {
    return accu[option] > curr[option] ? accu[option] : curr[option];
  };

  componentDidMount() {
    fetch("https://pomber.github.io/covid19/timeseries.json")
      .then(res => res.json())
      .then(res => {
        const propToLower = Object.keys(res).reduce((accu, curr) => {
          accu[curr.toLowerCase()] = res[curr];
          return accu;
        }, {});

        let arrOfTotal = [];

        for (const key in propToLower) {
          const totalEachCountry = propToLower[key].reduce((accu, curr) => {
            return {
              countryDeaths: this.reducerv(accu, curr, "deaths"),
              countryConfirmed: this.reducerv(accu, curr, "confirmed"),
              countryRecovered: this.reducerv(accu, curr, "recovered")
            };
          });
          arrOfTotal.push(totalEachCountry);
        }

        const overAll = arrOfTotal.reduce(
          (accu, curr) => {
            accu.overAllDeaths = accu.overAllDeaths + curr.countryDeaths;
            accu.overAllConfirmed =
              accu.overAllConfirmed + curr.countryConfirmed;
            accu.overAllRecovered =
              accu.overAllRecovered + curr.countryRecovered;
            return accu;
          },
          { overAllDeaths: 0, overAllConfirmed: 0, overAllRecovered: 0 }
        );

        this.setState({ datas: propToLower, overAll });
      });
  }

  changeHandler = e => {
    const { value, name } = e.target;

    if (value.length === 0) {
      this.setState({
        suggestedCountry: [],
        [name]: value,
        selected: {}
      });
    } else {
      const suggestedCountry = Object.keys(this.state.datas).filter(data =>
        data.includes(value.toLowerCase())
      );

      this.setState({
        [name]: value,
        suggestedCountry,
        selected: {}
      });
    }
  };

  clickHandler = country => {
    const { datas } = this.state;

    const filteredDatas = Object.keys(datas)
      .filter(data => country === data)
      .reduce((accu, curr) => {
        const filteredData = datas[curr];
        return {
          currentCountry: curr.toUpperCase(),
          totalDeaths: this.reducer(filteredData, "deaths"),
          totalConfirmed: this.reducer(filteredData, "confirmed"),
          totalRecovered: this.reducer(filteredData, "recovered")
        };
      }, {});

    this.setState({
      selected: filteredDatas,
      userInput: country,
      suggestedCountry: []
    });
  };

  render() {
    const {
      overAllConfirmed,
      overAllDeaths,
      overAllRecovered
    } = this.state.overAll;
    return (
      <div className="app">
        <header>
          <h1>BE INFORMED AND BE SAFE</h1>
          <div className="app-contents">
            <h2>Over all total</h2>
            <div className="app-content">
              <h3>Deaths: {overAllDeaths}</h3>
              <h3>Confirmed: {overAllConfirmed}</h3>
              <h3>Recovered: {overAllRecovered}</h3>
            </div>
          </div>
        </header>
        <form
          className="form"
          onSubmit={e => this.submitHandler(e)}
          autoComplete="off"
        >
          <Input
            value={this.state.userInput}
            changeHandler={this.changeHandler}
            type="text"
            name="userInput"
            placeholder="Search Country"
          ></Input>
        </form>

        {this.state.suggestedCountry.length === 0 ? null : (
          <SuggestedLists
            suggestedCountry={this.state.suggestedCountry}
            clickHandler={this.clickHandler}
          ></SuggestedLists>
        )}

        {Object.keys(this.state.selected).length === 0 ? null : (
          <Main selected={this.state.selected}></Main>
        )}
      </div>
    );
  }
}
