import React, { Component } from 'react';
import './App.css';
import Header from './components/header/header.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testString: {},
      testDBData: []
    }
  }
  

  getTestStringFromAPI = () => {
    return fetch("/auctions/test")
      .then(res => res.json())
      .then(test => {
        console.log(test);
        this.setState({testString: test})
      });
  }

  getDBDataFromAPI = () => {
    return fetch("/auctions")
      .then(res => res.json())
      .then(test => {
        console.log(test);
        let testRows = test.map((data) => {
          return (
            <li key={data.bossid}>
              {data.name}
            </li>  
          )
        });
        this.setState({testDBData: testRows})
      });
  }

  componentDidMount() {
    this.getTestStringFromAPI();
    // this.getDBDataFromAPI();
  }

  render() {
    return (
      <div>
        <Header />
        <h1>Wow Best Sellers</h1>
        <div>{this.state.testString.test}</div>
        <button onClick={this.getDBDataFromAPI}>
          Get data
        </button>
        <button onClick={() => {this.setState({testDBData: []})}}>
          Clear data
        </button>
        <ul>
          {this.state.testDBData}
        </ul>
      </div>
    );
  }
}

export default App;
