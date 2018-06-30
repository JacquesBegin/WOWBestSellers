import React, { Component } from 'react';
import './App.css';
import Header from './components/header/header.js';
import AllAuctions from './components/allAuctions/allAuctions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  
  componentDidMount() {
    
  }

  
  render() {
    return (
      <div>
        <Header />
        <AllAuctions />
        
      </div>
    );
  }
}

export default App;
