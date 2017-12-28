import React, { Component } from 'react';
import './App.scss';

import AccountDetails from './AccountDetails';
import Metamask from '../services/Metamask';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      account: '',
    };
  }

  componentWillMount() {
    const address = Metamask.setAccount();
    this.setState({ account: address });
  }

  render() {
    return (
      <div className="App">
        <AccountDetails account={this.state.account} />
      </div>
    );
  }
}

export default App;
