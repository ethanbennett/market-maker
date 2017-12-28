import React, { Component } from 'react';
import './App.scss';

import AccountDetails from './AccountDetails';
import Metamask from '../services/Metamask';
import logo from '../../public/ethLogo.png';

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
    // init();
    const { account } = this.state;

    return (
      <div className="App">
        <img className="eth-logo" src={logo} alt="Oops" />
        <AccountDetails account={account} />
      </div>
    );
  }
}

export default App;
