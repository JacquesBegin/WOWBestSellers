import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    testString: {}
  }

  getTestStringFromAPI = () => {
    fetch("/auctions/test")
      .then(res => res.json())
      .then(test => this.setState({testString: test}));
  }

  componentDidMount() {
    this.getTestStringFromAPI();
  }

  render() {
    return (
      <div>
        <h1>Wow Best Sellers</h1>
        <div>{this.state.testString.test}</div>
      </div>
    );
  }
}

export default App;
