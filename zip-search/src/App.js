import React, { Component } from 'react';
import './App.css';


function City(props) {
  return (
    <div className="city">
      <h4>{props.cityName}, {props.state}</h4>
      <ul>
        <li>State: {props.state}</li>
        <li>Location: {props.lat}, {props.long} </li>
        <li>Population (estimated): {props.population}</li>
        <li>Total Wages: {props.wages}</li>
      </ul>
    </div>
  );
}

function ZipSearchField(props) {
  return (
  <div className="zipField">
    <label for="zipSearch">Zip Code:  </label>
    <input type = 'number' id="zipSearch" onChange={ props.handleChange } />
  </div>);
}

class App extends Component {

  state = {
    zipCode: '',
    cities: [],
  }

  zipChange = (event) => {
    this.setState({ zipCode:event.target.value }) 
    // ^ the state will be updated LATER not imediately

    if(event.target.value.length === 5){
      fetch('http://ctp-zip-api.herokuapp.com/zip/' + event.target.value)
        .then(res => res.json())
        .then(cities => {
          this.setState( {cities} ); // this.setState({ cities:data })
        })
      .catch(err => {
        this.setState({ cities: [] })
      })
    }
    else{
      this.setState({ cities: [] })
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField handleChange={ this.zipChange }/>
        <div className="currentZip">Current Zip code is: { this.state.zipCode }</div> 
        <div>
          { this.state.cities.map(city => {
            return <City cityName = {city.City} state = {city.State} lat = {city.Lat} long = {city.Long} population = {city.EstimatedPopulation} wages = {city.TotalWages} />
          }) }
        </div>
      </div>
    );
  }
}

export default App;
