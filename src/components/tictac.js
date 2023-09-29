import { React, useEffect, useState } from "react";
import "./components.css";
const Weather = () => {
  const [val, setVal] = useState("");
  const [weather, setweather] = useState({});
  const [time, seTime] = useState("");
  const [cast, setCast] = useState('')
  const api = {
    key: "4334a1d5d1802a90a8cd2cd8cccb3476",
    base: "https://api.openweathermap.org/data/2.5/",
  };

  const GetWeather = async () => {
    try {
      const data = await fetch(
        `${api.base}weather?q=${val}&units=metric&APPID=${api.key}`
      );
      const response = await data.json();
      console.log(response);
      if (response.cod === 200) {
        setweather(response);

        throw new Error("not found");
      }else{
        setweather('00')
      }
    } catch (error) {
      console.log(error);
    }
  };
  const TimeZone = () => {
    // const cast = weather.weather[0].description;
    // const toUpper = cast.toUpperCase();
    // setCast(toUpper)
    if(weather.weather && weather.weather[0].description){
      const cast = weather.weather[0].description;
    const toUpper = cast.toUpperCase();
    setCast(toUpper)
    }



    if (time === '') {
      seTime('00:00')
    } else {
      const timeZoneOffsetSeconds = weather.timezone;
      const timeZoneOffsetHours = Math.floor(timeZoneOffsetSeconds / 3600);
      const timeZoneOffsetMinutes = Math.floor(
      (timeZoneOffsetSeconds % 3600) / 60
    );

    const formattedTimeZone = `${timeZoneOffsetHours >= 0 ? "+" : ""}${String(
      timeZoneOffsetHours
    ).padStart(2, "0")}:${String(timeZoneOffsetMinutes).padStart(2, "0")}`;
    console.log(formattedTimeZone);
    seTime(formattedTimeZone);
    }
  };
  useEffect(() => {
    const timer = setInterval(TimeZone, 1000);
    return () => clearInterval(timer);
  }, [weather]);
  
  const btn = () => {
    
    GetWeather();
  };

  return (
    <>
      <div className="main container-fluid d-flex justify-content-center align-items-center">
        <div className="sec_main row container-fluid col-12 col-md-8">
          <div className="head row container col-12 col-md-10 flex-row gap-5 d-flex justify-content-between align-items-center m-5">
            <div>
              <h4>Weather App</h4>
              <i>Created by Christian </i>
            </div>
            <div className="d-flex">
              <input
                type="text"
                name="location"
                id="location"
                placeholder="Enter Country"
                className="form-control"
                onChange={(e) => setVal(e.target.value)}
              />
              <button className="search m-2" onClick={btn}>
                Search
              </button>
            </div>
          </div>
          <div className="container-fluid">
            <div className="details  text-light d-flex flex-column col-12 gap-3">
              <div className="frist-items row col-12 d-flex align-items-center justify-content-center gap-3">
                <div className="col-4 text-center">
                  <h1>
                    <small>{weather.name}</small>
                  </h1>
                  <p>{weather.sys && weather.sys.country}</p>
                  <span className="cloud bi bi-cloud-sun-fill "></span>
                  <h3>{weather.weather && weather.weather[0].main}</h3>
                </div>
                <div className="second-items col-12 col-sm-3 d-flex justify-content-center align-items-center flex-column">
                  <p>Temp</p>
                  <p>{weather.main && weather.main.temp}F</p>
                  <p>{cast}</p>
                </div>
                <div className="col-12 col-sm-4 d-flex flex-column justify-content-center align-items-center">
                  <div className="wind">
                    <h5>Wind:</h5>
                    <div className="col-12 d-flex justify-content-between "><p>Speed: </p> {weather.wind && weather.wind.speed}kph</div>
                    <div className="col-12 d-flex justify-content-between "><p>Pressure: </p>{weather.main && weather.main.pressure}hPa</div>
                    <div className="col-12 d-flex justify-content-between "><p>Deg: </p>{weather.wind && weather.wind.deg}deg</div>
                    <div className="col-12 d-flex justify-content-between "><p>Gust: </p>{weather.wind && weather.wind.gust}</div>
                    
                  </div>
                </div>
              </div>
              <div className="below-items container-fluid col-12">
                <div className="row col-md-12">
                  <div className="col-12 col-md-4 d-flex flex-column justify-content-center align-items-center mb-3">
                    <div className="coor d-flex flex-column justify-content-center align-items-start p-3">
                      <h3>Altitude</h3>
                      <div className=" col-12 d-flex justify-content-between ">
                      <p>Longitude: </p><p>{weather.coord && weather.coord.lon}</p></div>
                      <div className=" col-12 d-flex justify-content-between ">
                      <p>Latitude: </p><p>{weather.coord && weather.coord.lat}</p></div>
                      <div className=" col-12 d-flex justify-content-between ">
                      <p>Humidity: </p><p>{weather.main && weather.main.humidity}</p></div>
                    </div>
                  </div>
                  <div className="col-12 col-md-8">
                    <div className="time d-flex flex-row">
                      <div className="temp col-6 col-md-5 d-flex flex-column  justify-content-center p-3 mb-3">
                        <h5>Temperature</h5>

                        <div className="col-12 d-flex justify-content-between"><p>Body Index: </p>
                        <p>{weather.main && weather.main.feels_like}</p></div>
                        <div className="col-12 d-flex justify-content-between"><p>Min-Temp: </p>
                        <p>{weather.main && weather.main.temp_min}</p></div>
                        <div className="col-12 d-flex justify-content-between"><p>Max-Temp: </p>
                        <p>{weather.main && weather.main.temp_max}</p></div>
                      </div>
                      <div className="zone col-6 col-md-7 p-3 d-flex flex-column justify-content-start align-items-end">
                        <h5>Timezone</h5>
                        <p>{time}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Weather;
