import React from "react";

import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

import "weather-icons/css/weather-icons.css";
import Weather from "./app_component/weather.component";

import Form from './app_component/form.component';

const API_Key = "8c1c3919e8a55c546f6f09d11f989c27";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      tem_max: undefined,
      temp_min: undefined,
      description: "",
      error: false,
    };

   
    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Dizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunn y",
      Clouds: "wi-day-fog",
    };
  }
  calCelsius(temp) {
    let cell = Math.floor(temp - 273.15);
    return cell;
  }
  get_WeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId <= 232:
        this.setState({ icon: this.weatherIcon.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: this.weatherIcon.Dizzle });
        break;
      case rangeId >= 500 && rangeId <= 531:
        this.setState({ icon: this.weatherIcon.Rain });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: this.weatherIcon.Atmosphere });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: this.weatherIcon.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: this.weatherIcon.Clouds });
        break;
      default:
        this.setState({ icon: this.weatherIcon.Clouds });
    }
  }
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
   if(city){
    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_Key}`
    );
    const response = await api_call.json();
    console.log(response);
    this.setState({
      city:`${response.name},${response.sys.country}`,
      
      celsius: this.calCelsius(response.main.temp),
      temp_min: this.calCelsius(response.main.temp_min),
      tem_max: this.calCelsius(response.main.temp_max),
      description: response.weather[0].description,
    });
    this.get_WeatherIcon(this.weatherIcon, response.weather[0].id);
   }
   else{
     this.setState({error:true});
   }
  };
  render() {
    return (
    
      <div className="App">
        <Form loadweather={this.getWeather} />
        <Weather
          city={this.state.city}
          weatherIcon={this.state.icon}
          country={this.state.country}
          temp_celsius={this.state.celsius}
          temp_max={this.state.tem_max}
          temp_min={this.state.temp_min}
          description={this.state.description}
          weatherIcon={this.state.icon}
        />
      </div>
     
    );
  }
}

export default App;
