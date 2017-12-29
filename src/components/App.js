import React, { Component } from 'react';
import './App.scss';

import AccountDetails from './AccountDetails';
import Metamask from '../services/Metamask';
import logo from '../../public/ethLogo.png';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accountData: '',
    };
  }

  async componentWillMount() {
    let balance;
    const address = await Metamask.setAccount();
    const onRinkeby = await Metamask.checkNetwork();

    if (address && onRinkeby) {
      balance = await Metamask.checkEthBalance(address);
    }

    this.setState({
      accountData: {
        address: address,
        onRinkeby: onRinkeby,
        balance: balance,
      },
    });
  }

  render() {
    const { accountData } = this.state;

    return (
      <div className="App">
        <img className="eth-logo" src={logo} alt="ethereum" />
        <AccountDetails accountData={accountData} />
      </div>
    );
  }
}

export default App;
