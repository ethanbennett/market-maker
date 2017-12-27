import React, { Component } from 'react';
import './App.scss';

import w3 from '../eth/web3Instance';

class App extends Component {
  render() {
    console.log(w3.eth.accounts.wallet);
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
