import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    testString: {},
    testDBData: []
  }

  getTestStringFromAPI = () => {
    fetch("/auctions/test")
      .then(res => res.json())
      .then(test => {
        console.log(test);
        this.setState({testString: test})
      });
  }

  getDBDataFromAPI = () => {
    fetch("/auctions")
      .then(res => res.json())
      .then(test => {
        console.log(test);
        this.setState({testDBData: test})
      });
  }

  componentDidMount() {
    this.getTestStringFromAPI();
    this.getDBDataFromAPI();
  }

  render() {
    return (
      <div>
        <h1>Wow Best Sellers</h1>
        <div>{this.state.testString.test}</div>
        <ul>
          {this.state.testDBData.map((data) => {
            return (
              <li key={data.bossid}>
                {data.name}
              </li>  
            )
          })}
        </ul>
      </div>
    );
  }
}

export default App;
