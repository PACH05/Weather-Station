import React, { useState } from "react";
import styled from "styled-components";
import pic from "./pagename.png";

const api = {
  key: "f36453a795e68c34a900630994b84339",
  base: "https://api.openweathermap.org/data/2.5/",
};
const Button = styled.button`
  background-color: blue;
  width: 100px;
  height: 43px;
  color: white;
  padding: 5px 15px;
  border-radius: 10px;
  outline: 0;
  text-transform: uppercase;
  margin: 10px 0px;
  cursor: pointer;
  transition: ease background-color 1000ms;
  &:hover {
    background-color: black;
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`;
function App() {
  const [query, setQuery] = useState(""); //Hook
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };
  const click = () => {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        setQuery("");
        console.log(result);
      });
  };
  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div className="app">
      <main>
        <div className="logoParent">
          <img className="logo" src={pic}></img>
        </div>
        <div className="parentSearch">
          <div className="search-box">
            <input
              type="text"
              className="search-bar"
              placeholder="Search a Location"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}
            />
          </div>
          <div className="button">
            <Button className="search" onClick={click}>
              Search
            </Button>
          </div>
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
