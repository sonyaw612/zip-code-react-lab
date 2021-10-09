import logo from './logo.svg';
import React, { Component } from 'react';
import './App.css';

function CitySearchField(props) {
  return (
  <div className="cityField">
    <label for="citySearch">City Name:  </label>
    <input type = 'text' id="citySearch" onChange={ props.handleChange } />
  </div>);
}

class App extends Component {
  state = {
    cityName: '',
    zipcodes: [],
  }

  cityChange = (event) => {
    this.setState({ cityName: event.target.value.toUpperCase() })

    fetch('http://ctp-zip-api.herokuapp.com/city/' + event.target.value.toUpperCase())
      .then(res => res.json())
      .then(zipcodes => {
        this.setState({zipcodes});
      })
    .catch(err => {
      this.setState({ zipcodes:[] })
    })

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>Zip Codes Based on City Search</h2>
        </header>
        <CitySearchField handleChange={ this.cityChange }/>
        <div>
          <h3>Zip Codes for {this.state.cityName}: </h3>
          {/* { console.log(this.state.zipcodes)} */}
          <div>
            { this.state.zipcodes.forEach((element) => {
              console.log(element)
              return <div>{ element }</div>
            }) }
          </div>
        </div>
      </div>
          
    );
  }
}

export default App;
