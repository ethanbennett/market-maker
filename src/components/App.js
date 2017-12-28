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

  async componentWillMount() {
    const address = await Metamask.setAccount();
    this.setState({ account: address });
  }

  render() {
    const { account } = this.state;

    return (
      <div className="App">
        <AccountDetails account={account} />
      </div>
    );
  }
}

export default App;
