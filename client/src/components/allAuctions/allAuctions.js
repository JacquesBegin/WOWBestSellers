import React, { Component } from 'react';
import './allAuctions.css';

class AllAuctions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testString: {},
      testDBData: [],
      allAuctions: [],
      idLow: 0,
      idHigh: 0
    }
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
    fetch("/auctions/bosses")
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
      })
      .catch(err => {
        console.error("Error displaying auctions. ERROR: ", err);
      });
  }

  getAllAuctionsFromDB = (startingAuctionId) => {
    let url = `/auctions/all/${startingAuctionId}`;

    fetch(url)
      .then(res => res.json())
      .then(auctions => {
        console.log(auctions);
        this.sortAllAuctions(auctions);
        this.setIdBounds();
      })
      .catch(err => {
        console.error("Error displaying auctions. ERROR: ", err);
      });
  }

  sortAllAuctions = (auctions) => {
    auctions.sort((a, b) => { return a - b});
    this.setState({allAuctions: auctions});
  }

  setIdBounds = () => {
    if (!this.state.allAuctions.length) {
      this.setState({idLow: 0});
      this.setState({idHigh: 0});
    } else {
      this.setState({idLow: this.state.allAuctions[0]});
      this.setState({idHigh: this.state.allAuctions[this.state.allAuctions.length - 1]});
    }
  }


  componentDidMount = () => {
    this.getTestStringFromAPI();
    // this.getDBDataFromAPI();
  }


  render() {
    return (
      <div>
        All Auctions
        <div>{this.state.testString.test}</div>
        <button onClick={this.getDBDataFromAPI}>
          Get data
        </button>
        <button onClick={() => { this.setState({testDBData: []})} }>
          Clear data
        </button>
        <button onClick={() => { this.getAllAuctionsFromDB(this.state.idHigh)} }>
          Get auctions
        </button>
        <ul>
          {this.state.testDBData}
        </ul>
      </div>
    )
  }

}

export default AllAuctions;